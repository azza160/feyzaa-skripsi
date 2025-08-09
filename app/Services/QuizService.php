<?php

namespace App\Services;

use App\Models\QuisHurufSession;
use App\Models\SoalQuisHuruf;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class QuizService
{
    /**
     * Create a new quiz session with optimized performance
     */
    public function createSession(User $user, array $data): QuisHurufSession
    {
        $session = QuisHurufSession::create([
            'id' => (string) Str::ulid(),
            'id_user' => $user->id,
            'level' => $data['level'],
            'jenis_huruf' => $data['jenis'],
            'mode' => $data['mode'] ?? 'manual',
            'waktu_max' => $this->getTimeLimit($data['level']),
            'started_at' => now(),
            'ended_at' => null,
            'total_exp' => 0,
            'total_benar' => 0,
        ]);

        return $session;
    }

    /**
     * Get questions for quiz with optimized querying
     */
    public function getQuestions(string $jenis, string $level, string $mode, array $letters = []): array
    {
        $query = SoalQuisHuruf::where('jenis', $jenis)
            ->where('level', $level);

        if ($mode === 'manual' && !empty($letters)) {
            $query->whereIn('huruf_id', $letters);
        }

        $soalList = $query->get()->shuffle();

        $transformedSoal = [];
        $processedHurufIds = [];

        foreach ($soalList as $soal) {
            if ($mode === 'random') {
                if (count($transformedSoal) >= 10) break;
            } else {
                if (in_array($soal->huruf_id, $processedHurufIds)) continue;
                $processedHurufIds[] = $soal->huruf_id;
            }

            $transformedSoal[] = [
                'id' => $soal->id,
                'question' => $soal->question,
                'character' => $soal->character,
                'options' => $this->formatOptions($soal),
            ];
        }

        return $transformedSoal;
    }

    /**
     * Create session soal records with batch insert for better performance
     * OPTIMIZED: Store soal IDs in JSON instead of individual records
     */
    public function createSessionSoals(User $user, QuisHurufSession $session, array $soalIds): void
    {
        // DEBUG: Log what we're doing
        Log::info('QuizService: Creating session soals', [
            'session_id' => $session->id,
            'soal_count' => count($soalIds),
            'soal_ids' => $soalIds
        ]);
        
        // OPTIMIZATION: Store soal IDs in session JSON instead of creating individual records
        // This reduces database operations from 10+ to just 1 update
        $session->update(['selected_soals' => $soalIds]);
        
        // DEBUG: Log what we stored
        Log::info('QuizService: Stored soal IDs in JSON', [
            'selected_soals' => $session->fresh()->selected_soals
        ]);
        
        // Only create records for questions that user actually answers
        // This will be done in saveAnswer() method when user answers
    }

    /**
     * Get session with optimized loading
     */
    public function getSession(string $sessionId, User $user): ?QuisHurufSession
    {
        return QuisHurufSession::where('id', $sessionId)
            ->where('id_user', $user->id)
            ->first();
    }

    /**
     * Save answer with optimized database operations
     * Stores answers in JSON and tracks attempt history properly
     */
    public function saveAnswer(User $user, string $sessionId, int $soalId, string $answer): array
    {
        $session = QuisHurufSession::find($sessionId);
        $soal = SoalQuisHuruf::findOrFail($soalId);
        $isCorrect = $soal->correct_answer === $answer;

        // Get global attempt count for this user and soal (across all sessions)
        $globalAttempt = $this->getGlobalAttemptCount($user, $soalId);
        $attempt = $globalAttempt + 1;

        // Calculate EXP based on global attempt and correctness
        $exp = 0;
        if ($isCorrect) {
            $exp = $this->calculateExp($session->level, $attempt);
        }

        // Get existing answers or initialize empty array
        $userAnswers = $session->user_answers ?? [];
        
        // Add/update answer in JSON
        $userAnswers[$soalId] = [
            'answer' => $answer,
            'is_correct' => $isCorrect,
            'exp' => $exp,
            'attempt' => $attempt, // Global attempt count
            'answered_at' => now()->toISOString(),
        ];

        // Update session with new answers
        $session->update(['user_answers' => $userAnswers]);

        return [
            'success' => true,
            'is_correct' => $isCorrect,
            'exp_gained' => $exp, // Hanya dapat EXP jika benar
            'attempt' => $attempt,
        ];
    }

    /**
     * Complete quiz session with optimized calculations
     */
    public function completeSession(QuisHurufSession $session, User $user): array
    {
        // Get answers from JSON
        $userAnswers = $session->user_answers ?? [];
        $selectedSoalIds = $session->selected_soals ?? [];
        
        // Get soal data
        $soals = SoalQuisHuruf::whereIn('id', $selectedSoalIds)->get();
        
        $totalExp = 0;
        $correctAnswers = 0;
        $answers = [];

        foreach ($soals as $soal) {
            $answeredData = $userAnswers[$soal->id] ?? null;
            
            if ($answeredData) {
                // Soal sudah dijawab
                $isCorrect = $answeredData['is_correct'] ?? false;
                $exp = $answeredData['exp'] ?? 0;
                
                if ($isCorrect) {
                    $totalExp += $exp;
                    $correctAnswers++;
                }

                $answers[] = [
                    'id' => $soal->id,
                    'question' => $soal->question,
                    'character' => $soal->character,
                    'userAnswer' => $answeredData['answer'],
                    'correctAnswer' => $soal->correct_answer,
                    'isCorrect' => $isCorrect,
                    'options' => $this->formatOptions($soal),
                    'expGained' => $exp,
                    'attempt' => $answeredData['attempt'] ?? 1,
                ];
            } else {
                // Soal belum dijawab (tidak seharusnya terjadi di completion)
                $answers[] = [
                    'id' => $soal->id,
                    'question' => $soal->question,
                    'character' => $soal->character,
                    'userAnswer' => null,
                    'correctAnswer' => $soal->correct_answer,
                    'isCorrect' => false,
                    'options' => $this->formatOptions($soal),
                    'expGained' => 0,
                    'attempt' => 0,
                ];
            }
        }

        $totalQuestions = count($answers);
        $percentage = $totalQuestions > 0 ? round(($correctAnswers / $totalQuestions) * 100) : 0;
        $timeSpent = $session->ended_at ? $session->ended_at->diffInSeconds($session->started_at) : $session->waktu_max;

        // Update session
        $session->update([
            'total_exp' => $totalExp,
            'total_benar' => $correctAnswers,
            'ended_at' => now()
        ]);

        return [
            'totalQuestions' => $totalQuestions,
            'correctAnswers' => $correctAnswers,
            'timeSpent' => $timeSpent,
            'percentage' => $percentage,
            'totalScore' => $totalExp,
            'answers' => $answers,
            'expGained' => $totalExp,
        ];
    }

    /**
     * Clean up active sessions for user
     */
    public function cleanupActiveSessions(User $user): void
    {
        QuisHurufSession::where('id_user', $user->id)
            ->whereNull('ended_at')
            ->update(['ended_at' => now()]);
    }

    /**
     * Get time limit for level
     */
    public function getTimeLimit(string $level): int
    {
        // ATURAN_EXP_DAN_TIMER.txt: Beginner=5m(300s), Intermediate=7m(420s), Advanced=10m(600s)
        return match($level) {
            'beginner' => 420,
            'intermediate' => 600,
            'advanced' => 900,
            default => 300,
        };
    }

    /**
     * Calculate EXP based on level and attempt
     */
    public function calculateExp(string $level, int $attempt): int
    {
        // ATURAN_EXP_DAN_TIMER.txt:
        // Beginner: 10/5/2/0, Intermediate: 15/8/3/0, Advanced: 20/10/5/0
        return match($level) {
            'beginner' => match($attempt) {
                1 => 15,
                2 => 10,
                3 => 7,
                default => 0,
            },
            'intermediate' => match($attempt) {
                1 => 20,
                2 => 13,
                3 => 8,
                default => 0,
            },
            'advanced' => match($attempt) {
                1 => 25,
                2 => 15,
                3 => 10,
                default => 0,
            },
            default => 0,
        };
    }

    /**
     * Format options for frontend
     */
    private function formatOptions($soal): array
    {
        return [
            ['id' => 'a', 'text' => $soal->option_a],
            ['id' => 'b', 'text' => $soal->option_b],
            ['id' => 'c', 'text' => $soal->option_c],
            ['id' => 'd', 'text' => $soal->option_d],
        ];
    }

    /**
     * Get attempt history for a specific soal from JSON data (global tracking)
     */
    public function getSoalAttemptHistory(User $user, int $soalId): array
    {
        // Get all sessions where user answered this soal
        $sessions = QuisHurufSession::where('id_user', $user->id)
            ->whereNotNull('user_answers')
            ->get();

        $attemptHistory = [];
        
        foreach ($sessions as $session) {
            $userAnswers = $session->user_answers ?? [];
            $answeredData = $userAnswers[$soalId] ?? null;
            
            if ($answeredData) {
                $attemptHistory[] = [
                    'session_id' => $session->id,
                    'attempt' => $answeredData['attempt'], // This is now global attempt
                    'answer' => $answeredData['answer'],
                    'is_correct' => $answeredData['is_correct'],
                    'exp' => $answeredData['exp'],
                    'answered_at' => $answeredData['answered_at'],
                    'level' => $session->level,
                    'mode' => $session->mode,
                ];
            }
        }

        // Sort by attempt number
        usort($attemptHistory, function($a, $b) {
            return $a['attempt'] <=> $b['attempt'];
        });

        return $attemptHistory;
    }

    /**
     * Get total attempts for a soal (global count across all sessions)
     */
    public function getTotalAttemptsForSoal(User $user, int $soalId): int
    {
        return $this->getGlobalAttemptCount($user, $soalId);
    }

    /**
     * Get global attempt count for a user and soal (across all sessions including archived)
     */
    private function getGlobalAttemptCount(User $user, int $soalId): int
    {
        // Get all sessions for this user (including archived)
        $sessions = QuisHurufSession::where('id_user', $user->id)
            ->whereNotNull('user_answers')
            ->get();

        $totalAttempts = 0;
        
        foreach ($sessions as $session) {
            $userAnswers = $session->user_answers ?? [];
            if (isset($userAnswers[$soalId])) {
                $totalAttempts++;
            }
        }

        // Also check archived sessions if archive table exists
        if (DB::getSchemaBuilder()->hasTable('quis_huruf_sessions_archive')) {
            $archivedSessions = DB::table('quis_huruf_sessions_archive')
                ->where('id_user', $user->id)
                ->whereNotNull('user_answers')
                ->get();

            foreach ($archivedSessions as $session) {
                $userAnswers = json_decode($session->user_answers, true) ?? [];
                if (isset($userAnswers[$soalId])) {
                    $totalAttempts++;
                }
            }
        }

        return $totalAttempts;
    }
} 