<?php

namespace App\Services;

use App\Models\SocialPublication;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use RuntimeException;

class BlogSocialPublisher
{
    private const BUFFER_ENDPOINT = 'https://api.buffer.com';

    /** The connected channels covered by the Buffer free plan. */
    private const SERVICES = ['facebook', 'linkedin', 'twitter', 'x'];

    /**
     * Discover public articles and publish each one once to every connected Sansoft channel.
     *
     * @return array{published:int,skipped:int,failed:int}
     */
    public function sync(): array
    {
        if (! $this->isConfigured()) {
            throw new RuntimeException('BUFFER_API_KEY is not configured.');
        }

        $response = Http::acceptJson()->timeout(20)->get(config('services.social.site_url').'/blog-feed.json');
        $response->throw();
        $posts = $response->json('posts', []);

        if (! is_array($posts)) {
            throw new RuntimeException('The Sansoft blog feed did not return a post list.');
        }

        $channels = $this->channels();
        $result = ['published' => 0, 'skipped' => 0, 'failed' => 0];

        $isInitialSync = ! SocialPublication::query()->exists();

        // The first run establishes a baseline. Existing articles are not pushed
        // out in bulk when the integration is first switched on.
        if ($isInitialSync) {
            foreach ($posts as $post) {
                if (! is_array($post) || ! $this->isPost($post)) {
                    continue;
                }

                foreach ($channels as $channel) {
                    SocialPublication::firstOrCreate(
                        ['source_url' => $post['url'], 'channel_id' => $channel['id']],
                        ['channel_service' => $channel['service'], 'status' => 'baseline'],
                    );
                    $result['skipped']++;
                }
            }

            return $result;
        }

        foreach ($posts as $post) {
            if (! is_array($post) || ! $this->isPost($post)) {
                continue;
            }

            foreach ($channels as $channel) {
                $publication = SocialPublication::firstOrCreate(
                    ['source_url' => $post['url'], 'channel_id' => $channel['id']],
                    ['channel_service' => $channel['service'], 'status' => 'pending'],
                );

                if (in_array($publication->status, ['published', 'baseline'], true)) {
                    $result['skipped']++;
                    continue;
                }

                try {
                    $bufferPost = $this->createPost($channel['id'], $channel['service'], $this->caption($post), $post['image']);
                    $publication->update([
                        'status' => 'published',
                        'buffer_post_id' => $bufferPost['id'] ?? null,
                        'error_message' => null,
                        'published_at' => now(),
                    ]);
                    $result['published']++;
                } catch (\Throwable $exception) {
                    $publication->update([
                        'status' => 'failed',
                        'error_message' => mb_substr($exception->getMessage(), 0, 60000),
                    ]);
                    Log::warning('Unable to publish Sansoft blog post through Buffer.', [
                        'article' => $post['url'],
                        'channel' => $channel['service'],
                        'exception' => $exception->getMessage(),
                    ]);
                    $result['failed']++;
                }
            }
        }

        return $result;
    }

    /** @return array<int, array{id:string,service:string}> */
    private function channels(): array
    {
        $data = $this->graphql('query { account { organizations { id } } }');
        $organizations = $data['data']['account']['organizations'] ?? [];
        $channels = [];

        foreach ($organizations as $organization) {
            $organizationId = $organization['id'] ?? null;
            if (! is_string($organizationId) || $organizationId === '') {
                continue;
            }

            $data = $this->graphql(
                'query Channels($organizationId: OrganizationId!) { channels(input: { organizationId: $organizationId }) { id service } }',
                ['organizationId' => $organizationId],
            );

            foreach ($data['data']['channels'] ?? [] as $channel) {
                $service = strtolower((string) ($channel['service'] ?? ''));
                $id = $channel['id'] ?? null;
                if (is_string($id) && $id !== '' && in_array($service, self::SERVICES, true)) {
                    $channels[] = ['id' => $id, 'service' => $service];
                }
            }
        }

        if ($channels === []) {
            throw new RuntimeException('No Facebook, LinkedIn, or X channels are connected in Buffer.');
        }

        return $channels;
    }

    /** @return array<string, mixed> */
    private function createPost(string $channelId, string $service, string $caption, string $image): array
    {
        $input = [
            'text' => $caption,
            'channelId' => $channelId,
            'schedulingType' => 'automatic',
            'mode' => 'shareNow',
            'assets' => [['image' => ['url' => $image]]],
        ];

        if ($service === 'facebook') {
            $input['metadata'] = ['facebook' => ['type' => 'post']];
        }

        $data = $this->graphql(<<<'GRAPHQL'
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    ... on PostActionSuccess {
      post { id }
    }
    ... on MutationError {
      message
    }
  }
}
GRAPHQL, [
            'input' => $input,
        ]);

        if (isset($data['errors'][0]['message'])) {
            throw new RuntimeException((string) $data['errors'][0]['message']);
        }

        $payload = $data['data']['createPost'] ?? [];
        if (isset($payload['message'])) {
            throw new RuntimeException((string) $payload['message']);
        }

        $post = $payload['post'] ?? null;
        if (! is_array($post)) {
            throw new RuntimeException('Buffer did not return a published post.');
        }

        return $post;
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
    private function isPost(array $post): bool
    {
        foreach (['title', 'excerpt', 'image', 'url'] as $field) {
            if (! isset($post[$field]) || ! is_string($post[$field]) || $post[$field] === '') {
                return false;
            }
        }

        return true;
    }

    /** @param array<string, mixed> $variables
     *  @return array<string, mixed>
     */
    private function graphql(string $query, array $variables = []): array
    {
        $response = Http::withToken(config('services.social.buffer_api_key'))
            ->acceptJson()
            ->timeout(30)
            ->post(self::BUFFER_ENDPOINT, ['query' => $query, 'variables' => (object) $variables]);
        $response->throw();

        return $response->json();
    }

    private function isConfigured(): bool
    {
        return is_string(config('services.social.buffer_api_key')) && config('services.social.buffer_api_key') !== '';
    }
}
