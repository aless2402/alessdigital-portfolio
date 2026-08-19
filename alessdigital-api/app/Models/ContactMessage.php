<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'email', 'phone', 'company', 'service_type', 'budget', 'timeline',
        'message', 'attachments', 'read',
    ];

    protected $casts = [
        'attachments' => 'array',
        'read' => 'boolean',
    ];
}
