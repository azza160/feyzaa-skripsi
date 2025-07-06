<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\QuisHurufSession;
use Symfony\Component\HttpFoundation\Response;

class QuizSecurityMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        
        if (!$user) {
            return redirect()->route('login');
        }

        // Validate session ID format (ULID = 26 characters)
        $sessionId = $request->route('sessionId');
        if ($sessionId && !$this->isValidULID($sessionId)) {
            abort(404, 'Invalid session ID');
        }

        // Check if session exists and belongs to user
        if ($sessionId) {
            $session = QuisHurufSession::where('id', $sessionId)
                ->where('id_user', $user->id)
                ->first();

            if (!$session) {
                abort(404, 'Session not found or access denied');
            }

            // Add session to request for controller use
            $request->attributes->set('quiz_session', $session);
        }

        return $next($request);
    }

    /**
     * Validate ULID format
     */
    private function isValidULID(string $ulid): bool
    {
        // ULID should be exactly 26 characters and contain only valid characters
        return strlen($ulid) === 26 && preg_match('/^[0-9A-Z]{26}$/', $ulid);
    }
}
