<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class QuizRateLimit
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        
        if (!$user) {
            return $next($request);
        }

        // Rate limit quiz starts (max 15 per hour)
        if ($request->routeIs('start-quis')) {
            $key = 'quiz_start_' . $user->id;
            
            if (RateLimiter::tooManyAttempts($key, 15)) {
                $seconds = RateLimiter::availableIn($key);
                return response()->json([
                    'error' => "Terlalu banyak quiz dimulai. Coba lagi dalam {$seconds} detik."
                ], 429);
            }
            
            RateLimiter::hit($key, 3600); // 1 hour
        }

        // Rate limit answer submissions (max 150 per hour)
        if ($request->routeIs('save-quiz-answer')) {
            $key = 'quiz_answer_' . $user->id;
            
            if (RateLimiter::tooManyAttempts($key, 150)) {
                $seconds = RateLimiter::availableIn($key);
                return response()->json([
                    'error' => "Terlalu banyak jawaban dikirim. Coba lagi dalam {$seconds} detik."
                ], 429);
            }
            
            RateLimiter::hit($key, 3600); // 1 hour
        }

        // Rate limit session access (max 50 per hour)
        if ($request->routeIs('quis.show') || $request->routeIs('review-quis')) {
            $key = 'quiz_session_' . $user->id;
            
            if (RateLimiter::tooManyAttempts($key, 50)) {
                $seconds = RateLimiter::availableIn($key);
                return response()->json([
                    'error' => "Terlalu banyak akses session. Coba lagi dalam {$seconds} detik."
                ], 429);
            }
            
            RateLimiter::hit($key, 3600); // 1 hour
        }

        return $next($request);
    }
} 