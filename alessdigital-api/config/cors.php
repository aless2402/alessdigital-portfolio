<?php

return [

    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    // En desarrollo: Vite corre en localhost:5173.
    // En producción: reemplaza por tu dominio real del frontend (Vercel).
    'allowed_origins' => [
        'http://localhost:5173',
        'https://alessdigital.pe',
        'https://www.alessdigital.pe',
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
