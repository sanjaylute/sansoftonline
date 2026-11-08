<?php

namespace App\Console\Commands;

use App\Models\SocialPublication;
use App\Services\BlogSocialPublisher;
use Illuminate\Console\Command;

class PublishOneBlogPostToSocial extends Command
{
    protected $signature = 'social:publish-blog {url : Exact public Sansoft article URL}';

    protected $description = 'Publish or retry one Sansoft article through the connected Buffer channels';

    public function handle(BlogSocialPublisher $publisher): int
    {
        $url = (string) $this->argument('url');

        // Baseline and failed records represent posts that have not been sent.
        // Already-published posts remain protected from accidental duplicates.
        SocialPublication::query()
            ->where('source_url', $url)
            ->whereIn('status', ['baseline', 'failed', 'pending'])
            ->update([
                'status' => 'pending',
                'error_message' => null,
                'updated_at' => now(),
            ]);

        try {
            $result = $publisher->sync($url);
        } catch (\Throwable $exception) {
            $this->error($exception->getMessage());

            return self::FAILURE;
        }

        $this->info("Published: {$result['published']}; skipped: {$result['skipped']}; failed: {$result['failed']}.");

        return $result['failed'] === 0 ? self::SUCCESS : self::FAILURE;
    }
}
