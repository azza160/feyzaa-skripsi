<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Vite Manifest Path
    |--------------------------------------------------------------------------
    |
    | Di development: pakai default (public/build)
    | Di production: pakai build di root project
    |
    */

    'manifest' => env('APP_ENV') === 'production'
        ? base_path('build/manifest.json')
        : public_path('build/manifest.json'),

    /*
    |--------------------------------------------------------------------------
    | Vite Development Server
    |--------------------------------------------------------------------------
    */

    'dev_server' => [
        'url' => env('VITE_DEV_SERVER_URL', 'http://localhost:5173'),
    ],

];
