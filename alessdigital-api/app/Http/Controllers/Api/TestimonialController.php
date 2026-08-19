<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Testimonial;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(
            Testimonial::where('published', true)->latest()->get()
        );
    }

    // Un cliente puede dejar su propio testimonio desde el portafolio.
    // Queda sin publicar hasta que Alessandra lo revise y lo apruebe.
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:120'],
            'role' => ['nullable', 'string', 'max:150'],
            'quote' => ['required', 'string', 'max:800'],
        ]);

        Testimonial::create([
            ...$validated,
            'published' => false,
        ]);

        return response()->json([
            'message' => 'Gracias por tu testimonio. Quedará publicado luego de ser revisado.',
        ], 201);
    }
}
