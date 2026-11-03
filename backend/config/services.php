<?php

return [
    'razorpay' => [
        'key' => env('RAZORPAY_KEY_ID'),
        'secret' => env('RAZORPAY_KEY_SECRET'),
    ],
    'paypal' => [
        'client_id' => env('PAYPAL_CLIENT_ID'),
        'secret' => env('PAYPAL_CLIENT_SECRET'),
        'base_url' => env('PAYPAL_BASE_URL', 'https://api-m.sandbox.paypal.com'),
    ],
    'turnstile' => [
        'secret_key' => env('TURNSTILE_SECRET_KEY'),
    ],
    'social' => [
        'site_url' => rtrim(env('SITE_URL', env('FRONTEND_URL', 'https://www.sansoftonline.com')), '/'),
    ],
    'meta' => [
        'graph_api_version' => env('META_GRAPH_API_VERSION', 'v24.0'),
        'facebook_page_id' => env('META_FACEBOOK_PAGE_ID'),
        'instagram_user_id' => env('META_INSTAGRAM_USER_ID'),
        'page_access_token' => env('META_PAGE_ACCESS_TOKEN'),
    ],

];
