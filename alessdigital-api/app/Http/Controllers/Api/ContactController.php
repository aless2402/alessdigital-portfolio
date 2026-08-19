<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\NewContactMessage;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:180'],
            'phone' => ['nullable', 'string', 'max:40'],
            'company' => ['nullable', 'string', 'max:120'],
            'service_type' => ['nullable', 'string', 'max:60'],
            'budget' => ['nullable', 'string', 'max:60'],
            'timeline' => ['nullable', 'string', 'max:60'],
            'message' => ['required', 'string', 'max:4000'],
            'attachments' => ['nullable', 'array', 'max:5'],
            'attachments.*' => ['file', 'mimes:pdf,docx,png,jpg,jpeg,zip', 'max:10240'], // 10 MB c/u
        ]);

        $attachments = [];
        if ($request->hasFile('attachments')) {
            foreach ($request->file('attachments') as $file) {
                $path = $file->store('contact-attachments', 'public');
                $attachments[] = [
                    'name' => $file->getClientOriginalName(),
                    'path' => $path,
                    'url' => Storage::url($path),
                ];
            }
        }

        $contactMessage = ContactMessage::create([
            ...collect($validated)->except('attachments')->toArray(),
            'attachments' => $attachments,
        ]);

        // No bloqueamos la respuesta si el correo falla (ej. SMTP mal configurado),
        // pero SÍ lo dejamos bien visible en el log para poder diagnosticarlo.
        try {
            Mail::to(env('CONTACT_NOTIFY_EMAIL', 'developerfullstack59@gmail.com'))
                ->send(new NewContactMessage($contactMessage));
        } catch (\Throwable $e) {
            Log::error('Fallo al enviar el correo de aviso de contacto: '.$e->getMessage());
        }

        return response()->json([
            'message' => 'Mensaje enviado correctamente.',
        ], 201);
    }
}
