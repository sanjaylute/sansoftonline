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
        'buffer_api_key' => env('BUFFER_API_KEY'),
        'site_url' => rtrim(env('SITE_URL', env('FRONTEND_URL', 'https://www.sansoftonline.com')), '/'),
    ],

];
