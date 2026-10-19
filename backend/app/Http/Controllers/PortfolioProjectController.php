<?php

namespace App\Http\Controllers;

use App\Models\PortfolioProject;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PortfolioProjectController
{
    public function index(): JsonResponse
    {
        return response()->json([
            'data' => PortfolioProject::query()
                ->where('published', true)
                ->latest('created_at')
                ->get(['id', 'title', 'domain', 'category', 'thumbnail', 'summary', 'services', 'results', 'created_at']),
        ]);
    }

    public function sync(Request $request): JsonResponse
    {
        $secret = (string) config('services.upstrait.portfolio_secret');
        $authorization = (string) $request->header('Authorization');

        if ($secret === '' || ! hash_equals('Bearer '.$secret, $authorization)) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $data = $request->validate([
            'source_campaign_id' => ['required', 'string', 'max:100'],
            'title' => ['required', 'string', 'max:180'],
            'domain' => ['required', 'string', 'max:255'],
            'category' => ['required', 'string', 'max:80'],
            'thumbnail' => ['required', 'url', 'max:2048'],
            'summary' => ['nullable', 'string', 'max:2000'],
            'services' => ['required', 'array', 'max:12'],
            'services.*' => ['required', 'string', 'max:80'],
            'results' => ['nullable', 'array', 'max:8'],
            'results.*.label' => ['required', 'string', 'max:100'],
            'results.*.value' => ['required', 'string', 'max:40'],
            'market' => ['nullable', 'string', 'max:8'],
            'published' => ['required', 'boolean'],
        ]);

        $host = parse_url(Str::startsWith($data['domain'], ['http://', 'https://']) ? $data['domain'] : 'https://'.$data['domain'], PHP_URL_HOST);
        if (! is_string($host) || ! filter_var($host, FILTER_VALIDATE_DOMAIN, FILTER_FLAG_HOSTNAME)) {
            return response()->json(['message' => 'Please provide a valid website domain.'], 422);
        }
        $data['domain'] = $host;

        try {
            $project = PortfolioProject::updateOrCreate(
                ['source_campaign_id' => $data['source_campaign_id']],
                $data,
            );
        } catch (\Throwable $exception) {
            Log::error('Unable to sync UpStrait campaign to the portfolio.', [
                'source_campaign_id' => $data['source_campaign_id'],
                'exception' => $exception->getMessage(),
            ]);

            return response()->json(['message' => 'Unable to sync this portfolio project.'], 503);
        }

        return response()->json(['data' => ['id' => $project->id, 'published' => $project->published]], 200);
    }
}
