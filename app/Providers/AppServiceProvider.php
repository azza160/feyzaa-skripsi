<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Vite;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Pakai manifest custom untuk production
        if (app()->environment('production')) {
            Vite::macro('manifestPath', function () {
                return base_path('build/manifest.json');
            });
        }
    }
}
