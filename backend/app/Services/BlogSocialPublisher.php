<?php

namespace App\Services;

use App\Models\SocialPublication;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class BlogSocialPublisher
{
    /**
     * Discover public articles and publish each one once to every connected Sansoft channel.
     *
     * @return array{published:int,skipped:int,failed:int}
     */
    public function sync(): array
    {
        $response = Http::acceptJson()->timeout(20)->get(config('services.social.site_url').'/blog-feed.json');
        $response->throw();
        $posts = $response->json('posts', []);

        if (! is_array($posts)) {
            throw new RuntimeException('The Sansoft blog feed did not return a post list.');
        }

        $channels = $this->metaChannels();
        if ($channels === []) {
            throw new RuntimeException('Configure Meta Facebook and/or Instagram publishing credentials.');
        }
        $result = ['published' => 0, 'skipped' => 0, 'failed' => 0];

        $existingChannelIds = SocialPublication::query()->pluck('channel_id')->all();

        foreach ($posts as $post) {
            if (! is_array($post) || ! $this->isPost($post)) {
                continue;
            }

            foreach ($channels as $channel) {
                // A newly connected service starts with a baseline, avoiding an
                // accidental bulk repost of the existing blog archive.
                if (! in_array($channel['id'], $existingChannelIds, true)) {
                    SocialPublication::firstOrCreate(
                        ['source_url' => $post['url'], 'channel_id' => $channel['id']],
                        ['channel_service' => $channel['service'], 'status' => 'baseline'],
                    );
                    $result['skipped']++;
                    continue;
                }

                $publication = SocialPublication::firstOrCreate(
                    ['source_url' => $post['url'], 'channel_id' => $channel['id']],
                    ['channel_service' => $channel['service'], 'status' => 'pending'],
                );

                if (in_array($publication->status, ['published', 'baseline'], true)) {
                    $result['skipped']++;
                    continue;
                }

                try {
                    $publishedPost = $this->publishToMeta($channel['service'], $post);
                    $publication->update([
                        'status' => 'published',
                        'buffer_post_id' => $publishedPost['id'] ?? null,
                        'error_message' => null,
                        'published_at' => now(),
                    ]);
                    $result['published']++;
                } catch (\Throwable $exception) {
                    $publication->update([
                        'status' => 'failed',
                        'error_message' => mb_substr($exception->getMessage(), 0, 60000),
                    ]);
                    Log::warning('Unable to publish Sansoft blog post.', [
                        'article' => $post['url'],
                        'channel' => $channel['service'],
                        'provider' => $channel['provider'],
                        'exception' => $exception->getMessage(),
                    ]);
                    $result['failed']++;
                }
            }
        }

        return $result;
    }

    /** @return array<int, array{id:string,service:string,provider:string}> */
    private function metaChannels(): array
    {
        $channels = [];

        if ($this->hasFacebookConfiguration()) {
            $channels[] = [
                'id' => 'meta-facebook:'.config('services.meta.facebook_page_id'),
                'service' => 'facebook',
                'provider' => 'meta',
            ];
        }

        if ($this->hasInstagramConfiguration()) {
            $channels[] = [
                'id' => 'meta-instagram:'.config('services.meta.instagram_user_id'),
                'service' => 'instagram',
                'provider' => 'meta',
            ];
        }

        return $channels;
    }

    /** @param array<string, mixed> $post */
    private function publishToMeta(string $service, array $post): array
    {
        return match ($service) {
            'facebook' => $this->publishToFacebook($post),
            'instagram' => $this->publishToInstagram($post),
            default => throw new RuntimeException('Unsupported Meta social channel.'),
        };
    }

    /** @param array<string, mixed> $post */
    private function publishToFacebook(array $post): array
    {
        $response = $this->metaRequest()->post($this->metaUrl((string) config('services.meta.facebook_page_id').'/feed'), [
            'message' => $this->captionWithoutUrl($post),
            'link' => $post['url'],
        ]);

        if (! $response->successful() || ! is_string($response->json('id'))) {
            throw new RuntimeException($this->metaError($response, 'Meta did not return a Facebook post ID.'));
        }

        return ['id' => $response->json('id')];
    }

    /** @param array<string, mixed> $post */
    private function publishToInstagram(array $post): array
    {
        $container = $this->metaRequest()->post($this->metaUrl((string) config('services.meta.instagram_user_id').'/media'), [
            'image_url' => $post['image'],
            'caption' => $this->caption($post),
        ]);

        $containerId = $container->json('id');
        if (! $container->successful() || ! is_string($containerId)) {
            throw new RuntimeException($this->metaError($container, 'Meta did not return an Instagram media container.'));
        }

        $published = $this->metaRequest()->post($this->metaUrl((string) config('services.meta.instagram_user_id').'/media_publish'), [
            'creation_id' => $containerId,
        ]);

        if (! $published->successful() || ! is_string($published->json('id'))) {
            throw new RuntimeException($this->metaError($published, 'Meta did not return an Instagram post ID.'));
        }

        return ['id' => $published->json('id')];
    }

    /** @param array<string, mixed> $post */
    private function caption(array $post): string
    {
        return trim(implode("\n\n", [
            $post['title'],
            $post['excerpt'],
            $post['url'],
            '#Sansoft #SEO #DigitalMarketing',
        ]));
    }

    /** @param array<string, mixed> $post */
    private function captionWithoutUrl(array $post): string
    {
        return trim(implode("\n\n", [
            $post['title'],
            $post['excerpt'],
            '#Sansoft #SEO #DigitalMarketing',
        ]));
    }

    /** @param array<string, mixed> $post */
    private function isPost(array $post): bool
    {
        foreach (['title', 'excerpt', 'image', 'url'] as $field) {
            if (! isset($post[$field]) || ! is_string($post[$field]) || $post[$field] === '') {
                return false;
            }
        }

        return true;
    }

    private function metaRequest()
    {
        return Http::asForm()
            ->acceptJson()
            ->timeout(30)
            ->withToken((string) config('services.meta.page_access_token'));
    }

    private function metaUrl(string $path): string
    {
        return 'https://graph.facebook.com/'.config('services.meta.graph_api_version').'/'.$path;
    }

    private function metaError($response, string $fallback): string
    {
        return (string) ($response->json('error.message') ?: $response->json('error.error_user_msg') ?: $fallback);
    }

    private function hasFacebookConfiguration(): bool
    {
        return $this->hasMetaToken() && filled(config('services.meta.facebook_page_id'));
    }

    private function hasInstagramConfiguration(): bool
    {
        return $this->hasMetaToken() && filled(config('services.meta.instagram_user_id'));
    }

    private function hasMetaToken(): bool
    {
        return filled(config('services.meta.page_access_token'));
    }

}
