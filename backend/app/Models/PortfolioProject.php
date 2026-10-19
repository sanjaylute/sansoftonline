<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortfolioProject extends Model
{
    protected $fillable = [
        'source_campaign_id', 'title', 'domain', 'category', 'thumbnail', 'summary', 'services', 'results', 'market', 'published',
    ];

    protected function casts(): array
    {
        return [
            'services' => 'array',
            'results' => 'array',
            'published' => 'boolean',
        ];
    }
}
