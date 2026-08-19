<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug', 'title', 'description', 'demo_url', 'tech_stack', 'order',
    ];

    protected $casts = [
        'tech_stack' => 'array',
    ];
}
