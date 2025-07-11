<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Kosakata;
use App\Models\QuisKosakataSession;
use Illuminate\Support\Str;

class TestKosakataAttemptTracking extends Command
{
    protected $signature = 'test:kosakata-attempt {user_id} {kosakata_id}';
    protected $description = 'Test kosakata attempt tracking and EXP calculation';

    public function handle()
    {
        $userId = $this->argument('user_id');
        $kosakataId = $this->argument('kosakata_id');

        $user = User::find($userId);
        $kosakata = Kosakata::find($kosakataId);

        if (!$user || !$kosakata) {
            $this->error('User or kosakata not found!');
            return 1;
        }

        $this->info("=== Testing Kosakata Attempt Tracking ===");
        $this->info("User: {$user->nama_lengkap}");
        $this->info("Kosakata: {$kosakata->kanji} ({$kosakata->romaji}) - {$kosakata->arti}");

        // Test global attempt count
        $totalAttempts = $this->getGlobalAttemptCount($user, $kosakataId);
        $this->info("Total global attempts for this kosakata: {$totalAttempts}");

        // Test attempt history
        $attemptHistory = $this->getAttemptHistory($user, $kosakataId);
        $this->info("Attempt history: " . count($attemptHistory) . " records");

        foreach ($attemptHistory as $index => $attempt) {
            $this->info("  Attempt " . ($index + 1) . ":");
            $this->info("    Session: {$attempt['session_id']}");
            $this->info("    Question Index: {$attempt['question_index']}");
            $this->info("    Answer: {$attempt['answer']}");
            $this->info("    Correct: " . ($attempt['is_correct'] ? 'Yes' : 'No'));
            $this->info("    EXP: {$attempt['exp']}");
            $this->info("    Level: {$attempt['level']}");
            $this->info("    Mode: {$attempt['mode']}");
        }

        // Test EXP calculation
        $this->info("\n=== EXP Calculation Test ===");
        for ($attempt = 1; $attempt <= 5; $attempt++) {
            $exp = $this->calculateExpForBeginner($attempt);
            $this->info("Attempt {$attempt}: {$exp} EXP");
        }

        return 0;
    }

    /**
     * Get global attempt count for a specific kosakata across all sessions
     */
    private function getGlobalAttemptCount($user, $kosakataId)
    {
        $sessions = QuisKosakataSession::where('user_id', $user->id)
            ->whereNotNull('soal')
            ->get();

        $totalAttempts = 0;
        
        foreach ($sessions as $session) {
            $soalList = $session->soal ?? [];
            
            foreach ($soalList as $soal) {
                $currentKosakataId = $soal['kosakata_id'] ?? null;
                
                if ($currentKosakataId === $kosakataId) {
                    $userAnswers = $session->user_answers ?? [];
                    $soalIndex = array_search($soal, $soalList);
                    
                    if (isset($userAnswers[$soalIndex])) {
                        $totalAttempts++;
                    }
                }
            }
        }
        
        return $totalAttempts;
    }

    /**
     * Get attempt history for a specific kosakata
     */
    private function getAttemptHistory($user, $kosakataId)
    {
        $sessions = QuisKosakataSession::where('user_id', $user->id)
            ->whereNotNull('soal')
            ->get();

        $attemptHistory = [];
        
        foreach ($sessions as $session) {
            $soalList = $session->soal ?? [];
            
            foreach ($soalList as $index => $soal) {
                $currentKosakataId = $soal['kosakata_id'] ?? null;
                
                if ($currentKosakataId === $kosakataId) {
                    $userAnswers = $session->user_answers ?? [];
                    
                    if (isset($userAnswers[$index])) {
                        $answered = $userAnswers[$index];
                        $attemptHistory[] = [
                            'session_id' => $session->id,
                            'question_index' => $index,
                            'answer' => $answered['selectedAnswer'] ?? 'N/A',
                            'is_correct' => $answered['isCorrect'] ?? false,
                            'exp' => $this->calculateExpForBeginner(count($attemptHistory) + 1),
                            'level' => $session->level,
                            'mode' => $session->mode,
                        ];
                    }
                }
            }
        }
        
        return $attemptHistory;
    }

    /**
     * Calculate EXP for beginner level based on attempt count
     */
    private function calculateExpForBeginner($attempt)
    {
        return match($attempt) {
            1 => 21,
            2 => 13,
            3 => 5,
            default => 0,
        };
    }
} 