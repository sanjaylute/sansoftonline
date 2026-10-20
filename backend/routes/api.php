<?php

use App\Http\Controllers\LeadController;
use App\Http\Controllers\PackagePaymentController;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json(['status' => 'ok', 'service' => 'sansoft-api']));
Route::get('/health/mail', function () {
    $status = [
        'mailer' => config('mail.default'),
        'smtp' => [
            'host_configured' => filled(config('mail.mailers.smtp.host')),
            'port' => config('mail.mailers.smtp.port'),
            'scheme' => config('mail.mailers.smtp.scheme'),
            'username_configured' => filled(config('mail.mailers.smtp.username')),
            'password_configured' => filled(config('mail.mailers.smtp.password')),
        ],
    ];

    if (! request()->boolean('send_test')) {
        return response()->json($status);
    }

    try {
        Mail::raw('Laravel mailer delivery verification. Please disregard this temporary diagnostic message.', function ($mail): void {
            $mail->to('sales@sansoftonline.com')->subject('Sansoft Laravel mailer verification');
        });

        return response()->json([...$status, 'delivery' => 'accepted']);
    } catch (\Throwable $exception) {
        return response()->json([...$status, 'delivery' => 'failed', 'error' => $exception->getMessage()], 503);
    }
});
Route::post('/contact', [LeadController::class, 'contact'])->middleware('throttle:10,1');
Route::post('/quotes', [LeadController::class, 'quote'])->middleware('throttle:10,1');
Route::get('/payments/config', [PackagePaymentController::class, 'config']);
Route::post('/payments/razorpay/order', [PackagePaymentController::class, 'razorpayOrder'])->middleware('throttle:10,1');
Route::post('/payments/razorpay/verify', [PackagePaymentController::class, 'verifyRazorpay'])->middleware('throttle:20,1');
Route::post('/payments/paypal/order', [PackagePaymentController::class, 'paypalOrder'])->middleware('throttle:10,1');
Route::post('/payments/paypal/capture', [PackagePaymentController::class, 'capturePaypal'])->middleware('throttle:20,1');
