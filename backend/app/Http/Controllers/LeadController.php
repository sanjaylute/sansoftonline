<?php

namespace App\Http\Controllers;

use App\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class LeadController
{
    public function contact(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:190'],
            'phone' => ['nullable', 'string', 'max:40'],
            'subject' => ['required', 'string', 'max:180'],
            'message' => ['required', 'string', 'max:5000'],
        ]);
        Lead::create([...$validated, 'type' => 'contact']);
        try {
            Mail::raw(implode("\n", [
                'A new contact enquiry was submitted on the Sansoft website.',
                '',
                'Name: '.$validated['name'],
                'Email: '.$validated['email'],
                'Phone: '.($validated['phone'] ?: 'Not provided'),
                'Subject: '.$validated['subject'],
                '',
                'Message:',
                $validated['message'],
            ]), function ($mail) use ($validated): void {
                $mail->to('sales@sansoftonline.com')
                    ->replyTo($validated['email'], $validated['name'])
                    ->subject('New contact enquiry from '.$validated['name']);
            });

            Mail::raw("Hi {$validated['name']},\n\nThank you for contacting Sansoft. We have received your message and our team will get back to you within one business day.\n\nYour message:\n{$validated['message']}\n\nRegards,\nSansoft Web Technologies\nsales@sansoftonline.com", function ($mail) use ($validated): void {
                $mail->to($validated['email'], $validated['name'])
                    ->subject('We received your message | Sansoft');
            });
        } catch (\Throwable $exception) {
            Log::error('Unable to send contact enquiry emails.', ['lead_email' => $validated['email'], 'exception' => $exception->getMessage()]);
            return response()->json(['message' => 'Your enquiry could not be emailed right now. Please try again or email sales@sansoftonline.com directly.'], 503);
        }
        return response()->json(['message' => 'Thank you. Your message has been received.'], 201);
    }

    public function quote(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email:rfc', 'max:190'],
            'phone' => ['nullable', 'string', 'max:40'],
            'service' => ['required', 'string', 'max:180'],
            'budget' => ['nullable', 'string', 'max:120'],
            'message' => ['required', 'string', 'max:5000'],
        ]);
        Lead::create([...$validated, 'type' => 'quote']);

        try {
            Mail::raw(implode("\n", [
                'A new quote request was submitted on the Sansoft website.',
                '',
                'Name: '.$validated['name'],
                'Email: '.$validated['email'],
                'Phone: '.($validated['phone'] ?: 'Not provided'),
                'Service: '.$validated['service'],
                'Budget: '.($validated['budget'] ?: 'Not provided'),
                '',
                'Project details:',
                $validated['message'],
            ]), function ($mail) use ($validated): void {
                $mail->to('sales@sansoftonline.com')
                    ->replyTo($validated['email'], $validated['name'])
                    ->subject('New quote request from '.$validated['name']);
            });

            Mail::raw("Hi {$validated['name']},\n\nThank you for requesting a quote from Sansoft. We have received your project details and our team will review them and get back to you within one business day.\n\nService: {$validated['service']}\n\nYour project details:\n{$validated['message']}\n\nRegards,\nSansoft Web Technologies\nsales@sansoftonline.com", function ($mail) use ($validated): void {
                $mail->to($validated['email'], $validated['name'])
                    ->subject('We received your quote request | Sansoft');
            });
        } catch (\Throwable $exception) {
            Log::error('Unable to send quote request emails.', ['lead_email' => $validated['email'], 'exception' => $exception->getMessage()]);
            return response()->json(['message' => 'Your quote request could not be emailed right now. Please try again or email sales@sansoftonline.com directly.'], 503);
        }

        return response()->json(['message' => 'Thank you. Your quote request has been received.'], 201);
    }
}
