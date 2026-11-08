<?php

namespace App\Console\Commands;

use App\Services\BlogSocialPublisher;
use Illuminate\Console\Command;

class PublishBlogPostsToSocial extends Command
{
    protected $signature = 'social:publish-blogs';

    protected $description = 'Publish new Sansoft blog posts to connected Buffer channels';

    public function handle(BlogSocialPublisher $publisher): int
    {
        try {
            $result = $publisher->sync();
        } catch (\Throwable $exception) {
            $this->error($exception->getMessage());

            return self::FAILURE;
        }

        $this->info("Published: {$result['published']}; skipped: {$result['skipped']}; failed: {$result['failed']}.");

        return $result['failed'] === 0 ? self::SUCCESS : self::FAILURE;
    }
}
