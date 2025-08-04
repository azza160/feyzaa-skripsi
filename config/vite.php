<?php

return [
    'manifest' => base_path('build/manifest.json'),
    'dev_server' => [
        'url' => env('VITE_DEV_SERVER_URL', 'http://localhost:5173'),
    ],
];
