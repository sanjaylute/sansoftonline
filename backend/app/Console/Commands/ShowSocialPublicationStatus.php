<?php

namespace App\Console\Commands;

use App\Models\SocialPublication;
use Illuminate\Console\Command;

class ShowSocialPublicationStatus extends Command
{
    protected $signature = 'social:publication-status {url? : Optional article URL to inspect}';

    protected $description = 'Show Buffer publishing status and errors for Sansoft articles';

    public function handle(): int
    {
        $query = SocialPublication::query()->latest();

        if ($url = $this->argument('url')) {
            $query->where('source_url', $url);
        }

        $publications = $query->get(['source_url', 'channel_service', 'status', 'buffer_post_id', 'error_message', 'published_at']);

        if ($publications->isEmpty()) {
            $this->warn('No social publication records found.');

            return self::SUCCESS;
        }

        $this->table(
            ['Channel', 'Status', 'Buffer post', 'Published', 'Error'],
            $publications->map(fn (SocialPublication $publication) => [
                $publication->channel_service,
                $publication->status,
                $publication->buffer_post_id ?? '-',
                $publication->published_at?->toDateTimeString() ?? '-',
                $publication->error_message ?? '-',
            ])->all(),
        );

        return self::SUCCESS;
    }
}
