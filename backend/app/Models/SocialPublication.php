<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SocialPublication extends Model
{
    protected $fillable = [
        'source_url',
        'channel_id',
        'channel_service',
        'buffer_post_id',
        'status',
        'error_message',
        'published_at',
    ];

    protected function casts(): array
    {
        return ['published_at' => 'datetime'];
    }
}
