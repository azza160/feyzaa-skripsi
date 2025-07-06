<?php

namespace App\Services;

use App\Models\QuisHurufSession;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class QuizPerformanceService
{
    /**
     * Get quiz performance metrics
     */
    public function getPerformanceMetrics(): array
    {
        $cacheKey = 'quiz_performance_metrics';
        
        return Cache::remember($cacheKey, 300, function () {
            $totalSessions = QuisHurufSession::count();
            $activeSessions = QuisHurufSession::whereNull('ended_at')->count();
            $completedSessions = QuisHurufSession::whereNotNull('ended_at')->count();
            
            // Average session duration
            $avgDuration = QuisHurufSession::whereNotNull('ended_at')
                ->selectRaw('AVG(TIMESTAMPDIFF(SECOND, started_at, ended_at)) as avg_duration')
                ->first()
                ->avg_duration ?? 0;
            
            // Database size estimation
            $dbSize = $this->estimateDatabaseSize();
            
            return [
                'total_sessions' => $totalSessions,
                'active_sessions' => $activeSessions,
                'completed_sessions' => $completedSessions,
                'avg_duration_seconds' => round($avgDuration, 2),
                'estimated_db_size_mb' => $dbSize,
                'performance_status' => $this->getPerformanceStatus($totalSessions, $activeSessions),
            ];
        });
    }

    /**
     * Estimate database size
     */
    private function estimateDatabaseSize(): float
    {
        $sessionCount = QuisHurufSession::count();
        $avgJsonSize = 2048; // Estimated average JSON size in bytes
        
        return round(($sessionCount * $avgJsonSize) / (1024 * 1024), 2); // Convert to MB
    }

    /**
     * Get performance status
     */
    private function getPerformanceStatus(int $totalSessions, int $activeSessions): string
    {
        if ($totalSessions > 10000) {
            return 'HIGH_LOAD';
        } elseif ($activeSessions > 100) {
            return 'MEDIUM_LOAD';
        } else {
            return 'NORMAL';
        }
    }

    /**
     * Get user quiz statistics
     */
    public function getUserQuizStats(User $user): array
    {
        $cacheKey = "user_quiz_stats_{$user->id}";
        
        return Cache::remember($cacheKey, 600, function () use ($user) {
            $sessions = QuisHurufSession::where('id_user', $user->id)->get();
            
            $totalQuizzes = $sessions->count();
            $completedQuizzes = $sessions->whereNotNull('ended_at')->count();
            $totalExp = $sessions->sum('total_exp');
            $avgScore = $completedQuizzes > 0 ? $sessions->whereNotNull('ended_at')->avg('total_exp') : 0;
            
            return [
                'total_quizzes' => $totalQuizzes,
                'completed_quizzes' => $completedQuizzes,
                'total_exp_earned' => $totalExp,
                'average_score' => round($avgScore, 2),
                'completion_rate' => $totalQuizzes > 0 ? round(($completedQuizzes / $totalQuizzes) * 100, 2) : 0,
            ];
        });
    }

    /**
     * Cleanup recommendations
     */
    public function getCleanupRecommendations(): array
    {
        $metrics = $this->getPerformanceMetrics();
        $recommendations = [];
        
        if ($metrics['total_sessions'] > 5000) {
            $recommendations[] = 'Consider running cleanup command to remove old sessions';
        }
        
        if ($metrics['active_sessions'] > 50) {
            $recommendations[] = 'High number of active sessions detected';
        }
        
        if ($metrics['estimated_db_size_mb'] > 100) {
            $recommendations[] = 'Database size is growing, consider archiving old data';
        }
        
        return $recommendations;
    }
} 