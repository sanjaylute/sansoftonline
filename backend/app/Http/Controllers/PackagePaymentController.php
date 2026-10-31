<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Throwable;

class PackagePaymentController
{
    private const PACKAGES = [
        'SEO' => ['Basic SEO' => 99, 'Standard SEO' => 199, 'Premium SEO' => 299],
        'Google Ads' => ['Basic Google Ads' => 100, 'Standard Google Ads' => 300, 'Premium Google Ads' => 550],
        'Social Ads' => ['Basic Social Ads' => 65, 'Standard Social Ads' => 220, 'Premium Social Ads' => 400],
        'Social Post Design' => ['Basic' => 10, 'Standard' => 55, 'Premium' => 150],
    ];

    public function config(): JsonResponse
    {
        $baseUrl = (string) config('services.paypal.base_url');

        return response()->json([
            'paypalClientId' => config('services.paypal.client_id'),
            'paypalEnvironment' => str_contains($baseUrl, 'sandbox.paypal.com') ? 'sandbox' : 'live',
        ]);
    }

    public function razorpayOrder(Request $request): JsonResponse
    {
        $data = $this->validatedCustomer($request);
        $key = config('services.razorpay.key');
        $secret = config('services.razorpay.secret');
        if (!$key || !$secret) return response()->json(['message' => 'Razorpay is not configured yet. Please contact Sansoft to purchase this package.'], 503);
        $amount = $this->amount($data);
        if ($amount instanceof JsonResponse) return $amount;

        try {
            $response = Http::withBasicAuth($key, $secret)->post('https://api.razorpay.com/v1/orders', [
                'amount' => $amount * 100, 'currency' => 'USD', 'receipt' => (string) Str::uuid(),
                'notes' => ['package' => $data['package'], 'tier' => $data['tier'], 'customer_email' => $data['email']],
            ]);
            if (!$response->successful() || !$response->json('id')) return response()->json(['message' => 'Razorpay could not create the order. Please try again.'], 502);
            DB::table('package_payments')->insert($this->paymentRow('razorpay', $response->json('id'), $data, $amount));
            return response()->json(['orderId' => $response->json('id'), 'amount' => $amount * 100, 'currency' => 'USD', 'key' => $key]);
        } catch (Throwable $error) {
            report($error);
            return response()->json(['message' => 'Payment service is temporarily unavailable.'], 502);
        }
    }

    public function verifyRazorpay(Request $request): JsonResponse
    {
        $data = $request->validate([
            'razorpay_order_id' => ['required', 'string', 'max:100'],
            'razorpay_payment_id' => ['required', 'string', 'max:100'],
            'razorpay_signature' => ['required', 'string', 'max:200'],
        ]);
        $payment = DB::table('package_payments')->where('gateway', 'razorpay')->where('gateway_order_id', $data['razorpay_order_id'])->first();
        if (!$payment) return response()->json(['message' => 'Payment order not found.'], 404);
        $expected = hash_hmac('sha256', $data['razorpay_order_id'].'|'.$data['razorpay_payment_id'], (string) config('services.razorpay.secret'));
        if (!hash_equals($expected, $data['razorpay_signature'])) return response()->json(['message' => 'Payment signature could not be verified.'], 422);
        $updated = DB::table('package_payments')->where('id', $payment->id)->where('status', '!=', 'paid')->update([
            'gateway_payment_id' => $data['razorpay_payment_id'], 'status' => 'paid', 'updated_at' => now(),
        ]);
        if ($updated) $this->sendPaymentEmail($payment, 'paid', $data['razorpay_payment_id']);
        return response()->json(['message' => 'Payment verified.']);
    }

    public function paypalOrder(Request $request): JsonResponse
    {
        $data = $this->validatedCustomer($request);
        $amount = $this->amount($data);
        if ($amount instanceof JsonResponse) return $amount;
        try {
            $token = $this->paypalToken();
            if (!$token) return response()->json(['message' => 'PayPal is not configured yet. Please contact Sansoft to purchase this package.'], 503);
            $response = Http::withToken($token)->post(rtrim(config('services.paypal.base_url'), '/').'/v2/checkout/orders', [
                'intent' => 'CAPTURE', 'purchase_units' => [[
                    'reference_id' => (string) Str::uuid(),
                    'description' => $data['package'].' - '.$data['tier'],
                    'custom_id' => $data['email'],
                    'amount' => ['currency_code' => 'USD', 'value' => number_format($amount, 2, '.', '')],
                ]],
            ]);
            if (!$response->successful() || !$response->json('id')) return response()->json(['message' => 'PayPal could not create the order. Please try again.'], 502);
            DB::table('package_payments')->insert($this->paymentRow('paypal', $response->json('id'), $data, $amount));
            return response()->json(['orderId' => $response->json('id')]);
        } catch (Throwable $error) {
            report($error);
            return response()->json(['message' => 'Payment service is temporarily unavailable.'], 502);
        }
    }

    public function capturePaypal(Request $request): JsonResponse
    {
        $data = $request->validate(['orderId' => ['required', 'string', 'max:100']]);
        $payment = DB::table('package_payments')->where('gateway', 'paypal')->where('gateway_order_id', $data['orderId'])->first();
        if (!$payment) return response()->json(['message' => 'Payment order not found.'], 404);
        if ($payment->status === 'paid') return response()->json(['message' => 'Payment already confirmed.']);
        try {
            $token = $this->paypalToken();
            if (!$token) return response()->json(['message' => 'PayPal is not configured.'], 503);
            $response = Http::withToken($token)
                ->acceptJson()
                ->withHeaders([
                    'Content-Type' => 'application/json',
                    'PayPal-Request-Id' => 'capture-'.$payment->gateway_order_id,
                ])
                ->send('POST', rtrim(config('services.paypal.base_url'), '/').'/v2/checkout/orders/'.$payment->gateway_order_id.'/capture', [
                    'body' => '{}',
                ]);
            $capture = $response->json('purchase_units.0.payments.captures.0');
            $expected = number_format($payment->amount_minor, 2, '.', '');
            if (!$response->successful() || $response->json('status') !== 'COMPLETED' || !$capture || ($capture['status'] ?? null) !== 'COMPLETED' || ($capture['amount']['currency_code'] ?? null) !== 'USD' || ($capture['amount']['value'] ?? null) !== $expected) {
                $this->markFailed($payment, $this->paypalCaptureFailureReason($response, $capture, $expected), $response->json());
                return response()->json(['message' => 'PayPal payment could not be confirmed. Please contact Sansoft if the charge appears on your account.'], 422);
            }
            $updated = DB::table('package_payments')->where('id', $payment->id)->where('status', '!=', 'paid')->update([
                'gateway_payment_id' => $capture['id'], 'status' => 'paid', 'gateway_payload' => json_encode($response->json()), 'updated_at' => now(),
            ]);
            if ($updated) $this->sendPaymentEmail($payment, 'paid', $capture['id']);
            return response()->json(['message' => 'Payment captured.']);
        } catch (Throwable $error) {
            report($error);
            $this->markFailed($payment, 'PayPal payment capture request failed.');
            return response()->json(['message' => 'Payment confirmation is temporarily unavailable.'], 502);
        }
    }

    public function paymentFailed(Request $request): JsonResponse
    {
        $data = $request->validate([
            'gateway' => ['required', 'in:razorpay,paypal'],
            'orderId' => ['required', 'string', 'max:100'],
            'reason' => ['nullable', 'string', 'max:500'],
        ]);
        $payment = DB::table('package_payments')->where('gateway', $data['gateway'])->where('gateway_order_id', $data['orderId'])->first();
        if (!$payment) return response()->json(['message' => 'Payment order not found.'], 404);
        if ($payment->status === 'paid') return response()->json(['message' => 'Payment already confirmed.']);

        $this->markFailed($payment, $data['reason'] ?? 'Payment was not completed.');
        return response()->json(['message' => 'Payment failure recorded.']);
    }

    private function validatedCustomer(Request $request): array
    {
        return $request->validate([
            'package' => ['required', 'string', 'in:SEO,Google Ads,Social Ads,Social Post Design,Custom Service'],
            'tier' => ['required', 'string', 'max:100'],
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:190'],
            'customAmount' => ['nullable', 'integer', 'min:1', 'max:100000', 'required_if:package,Custom Service'],
            'comments' => ['nullable', 'string', 'max:2000', 'required_if:package,Custom Service'],
        ]);
    }

    private function amount(array $data): int|JsonResponse
    {
        if ($data['package'] === 'Custom Service') return (int) $data['customAmount'];
        $amount = self::PACKAGES[$data['package']][$data['tier']] ?? null;
        return $amount ?? response()->json(['message' => 'The selected package is unavailable.'], 422);
    }

    private function paymentRow(string $gateway, string $orderId, array $data, int $amount): array
    {
        return ['gateway' => $gateway, 'gateway_order_id' => $orderId, 'package' => $data['package'], 'tier' => $data['tier'], 'amount_minor' => $amount, 'currency' => 'USD', 'customer_name' => $data['name'], 'customer_email' => $data['email'], 'comments' => $data['comments'] ?? null, 'status' => 'pending', 'created_at' => now(), 'updated_at' => now()];
    }

    private function markFailed(object $payment, string $reason, mixed $payload = null): void
    {
        $updated = DB::table('package_payments')->where('id', $payment->id)->where('status', 'pending')->update([
            'status' => 'failed',
            'gateway_payload' => json_encode(['reason' => $reason, 'payload' => $payload]),
            'updated_at' => now(),
        ]);
        if ($updated) $this->sendPaymentEmail($payment, 'failed', null, $reason);
    }

    private function paypalCaptureFailureReason($response, ?array $capture, string $expected): string
    {
        $details = array_filter([
            'HTTP '.$response->status(),
            'order_status='.$response->json('status'),
            'paypal_error='.$response->json('name'),
            'paypal_message='.$response->json('message'),
            'debug_id='.$response->json('debug_id'),
            'capture_status='.($capture['status'] ?? 'missing'),
            'capture_amount='.($capture['amount']['value'] ?? 'missing'),
            'expected_amount='.$expected,
        ], static fn ($value): bool => !str_ends_with((string) $value, '='));

        return 'PayPal capture could not be confirmed. '.implode('; ', $details);
    }

    private function sendPaymentEmail(object $payment, string $status, ?string $transactionId = null, ?string $reason = null): void
    {
        $amount = '$'.number_format($payment->amount_minor, 2).' '.$payment->currency;
        $isPaid = $status === 'paid';
        $subject = $isPaid ? 'Payment received: '.$payment->tier : 'Payment not completed: '.$payment->tier;
        $adminMessage = implode("\n", array_filter([
            $isPaid ? 'A package payment was completed on the Sansoft website.' : 'A package checkout was not completed on the Sansoft website.',
            '',
            'Customer: '.$payment->customer_name,
            'Email: '.$payment->customer_email,
            'Package: '.$payment->package.' — '.$payment->tier,
            'Amount: '.$amount,
            'Gateway: '.ucfirst($payment->gateway),
            'Order ID: '.$payment->gateway_order_id,
            $payment->comments ? 'Comments: '.$payment->comments : null,
            $transactionId ? 'Payment ID: '.$transactionId : null,
            $reason ? 'Reason: '.$reason : null,
        ]));
        $customerMessage = $isPaid
            ? "Hi {$payment->customer_name},\n\nThank you. We have received your payment of {$amount} for the {$payment->tier} {$payment->package} package. Our team will contact you shortly with the next steps.\n\nOrder reference: {$payment->gateway_order_id}\n\nRegards,\nSansoft Web Technologies\nsales@sansoftonline.com"
            : "Hi {$payment->customer_name},\n\nYour payment for the {$payment->tier} {$payment->package} package was not completed, and no confirmed payment has been recorded by Sansoft. You can try checkout again or contact us at sales@sansoftonline.com for help.\n\nOrder reference: {$payment->gateway_order_id}\n\nRegards,\nSansoft Web Technologies\nsales@sansoftonline.com";

        try {
            Mail::raw($adminMessage, function ($mail) use ($subject): void {
                $mail->to('sales@sansoftonline.com')->subject($subject);
            });
            Mail::raw($customerMessage, function ($mail) use ($payment, $subject): void {
                $mail->to($payment->customer_email, $payment->customer_name)->subject($subject);
            });
        } catch (Throwable $error) {
            Log::error('Unable to send package payment notification emails.', ['payment_id' => $payment->id, 'exception' => $error->getMessage()]);
        }
    }

    private function paypalToken(): ?string
    {
        $client = config('services.paypal.client_id');
        $secret = config('services.paypal.secret');
        if (!$client || !$secret) return null;
        $response = Http::asForm()->withBasicAuth($client, $secret)->post(rtrim(config('services.paypal.base_url'), '/').'/v1/oauth2/token', ['grant_type' => 'client_credentials']);
        return $response->successful() ? $response->json('access_token') : null;
    }
}
