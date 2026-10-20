<?php

use App\Http\Controllers\LeadController;
use App\Http\Controllers\PackagePaymentController;
use Illuminate\Support\Facades\Route;

Route::get('/health', fn () => response()->json(['status' => 'ok', 'service' => 'sansoft-api']));
Route::post('/contact', [LeadController::class, 'contact'])->middleware('throttle:10,1');
Route::post('/quotes', [LeadController::class, 'quote'])->middleware('throttle:10,1');
Route::get('/payments/config', [PackagePaymentController::class, 'config']);
Route::post('/payments/razorpay/order', [PackagePaymentController::class, 'razorpayOrder'])->middleware('throttle:10,1');
Route::post('/payments/razorpay/verify', [PackagePaymentController::class, 'verifyRazorpay'])->middleware('throttle:20,1');
Route::post('/payments/paypal/order', [PackagePaymentController::class, 'paypalOrder'])->middleware('throttle:10,1');
Route::post('/payments/paypal/capture', [PackagePaymentController::class, 'capturePaypal'])->middleware('throttle:20,1');
Route::post('/payments/failure', [PackagePaymentController::class, 'paymentFailed'])->middleware('throttle:20,1');
