<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class QuizRateLimit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!Auth::check()) {
            return $next($request);
        }

        $userId = Auth::id();
        $cacheKey = "quiz_rate_limit_{$userId}";
        
        // Get current quiz attempts in the last hour
        $attempts = Cache::get($cacheKey, []);
        $now = now();
        
        // Remove attempts older than 1 hour
        $attempts = array_filter($attempts, function($timestamp) use ($now) {
            return $now->diffInMinutes($timestamp) < 60;
        });
        
        // Check if user has exceeded limit (10 attempts per hour)
        if (count($attempts) >= 10) {
            $oldestAttempt = min($attempts);
            $nextAllowedTime = $oldestAttempt->addHour();
            $minutesUntilReset = $now->diffInMinutes($nextAllowedTime, false);
            
            if ($request->wantsJson()) {
                return response()->json([
                    'error' => 'Rate limit exceeded',
                    'message' => "Anda telah mencapai batas maksimal 10 kuis per jam. Silakan coba lagi dalam {$minutesUntilReset} menit.",
                    'minutes_until_reset' => $minutesUntilReset,
                    'rate_limited' => true
                ], 429);
            }
            
            // For non-JSON requests, redirect back with error message
            return redirect()->back()->with('error', "Anda telah mencapai batas maksimal 10 kuis per jam. Silakan coba lagi dalam {$minutesUntilReset} menit.");
        }
        
        // Add current attempt to cache
        $attempts[] = $now;
        Cache::put($cacheKey, $attempts, 3600); // Cache for 1 hour
        
        return $next($request);
    }
} 