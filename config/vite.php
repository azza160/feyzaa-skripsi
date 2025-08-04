<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Vite Manifest Path
    |--------------------------------------------------------------------------
    */
    'manifest' => base_path(app()->environment('production') ? 'build/manifest.json' : 'public/build/manifest.json'),

    /*
    |--------------------------------------------------------------------------
    | Dev server URL
    |--------------------------------------------------------------------------
    */
    'dev_server' => [
        'url' => env('VITE_DEV_SERVER_URL', 'http://localhost:5173'),
    ],
];
