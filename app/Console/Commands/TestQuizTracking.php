<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\SoalQuisHuruf;
use App\Services\QuizService;

class TestQuizTracking extends Command
{
    protected $signature = 'test:quiz-tracking {user_id} {soal_id}';
    protected $description = 'Test quiz tracking and EXP calculation';

    public function handle()
    {
        $userId = $this->argument('user_id');
        $soalId = $this->argument('soal_id');

        $user = User::find($userId);
        $soal = SoalQuisHuruf::find($soalId);

        if (!$user || !$soal) {
            $this->error('User or soal not found!');
            return 1;
        }

        $quizService = new QuizService();

        $this->info("=== Testing Global Quiz Tracking ===");
        $this->info("User: {$user->name}");
        $this->info("Soal: {$soal->question}");
        $this->info("Correct Answer: {$soal->correct_answer}");

        // Test global attempt count
        $totalAttempts = $quizService->getTotalAttemptsForSoal($user, $soalId);
        $this->info("Total global attempts for this soal: {$totalAttempts}");

        // Test attempt history from JSON
        $attemptHistory = $quizService->getSoalAttemptHistory($user, $soalId);
        $this->info("Attempt history from JSON: " . count($attemptHistory) . " records");

        foreach ($attemptHistory as $index => $attempt) {
            $this->info("  Global Attempt {$attempt['attempt']}:");
            $this->info("    Session: {$attempt['session_id']}");
            $this->info("    Answer: {$attempt['answer']}");
            $this->info("    Correct: " . ($attempt['is_correct'] ? 'Yes' : 'No'));
            $this->info("    EXP: {$attempt['exp']}");
            $this->info("    Level: {$attempt['level']}");
            $this->info("    Mode: {$attempt['mode']}");
        }

        // Test EXP calculation for next attempt
        $nextAttempt = $totalAttempts + 1;
        $expForNextAttempt = $quizService->calculateExp('beginner', $nextAttempt);
        $this->info("EXP for next global attempt ({$nextAttempt}): {$expForNextAttempt}");

        // Show EXP progression
        $this->info("\n=== EXP Progression ===");
        for ($i = 1; $i <= 5; $i++) {
            $exp = $quizService->calculateExp('beginner', $i);
            $this->info("Attempt {$i}: {$exp} EXP");
        }

        return 0;
    }
} 