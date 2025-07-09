<?php

namespace App\Http\Controllers;

use App\Models\QuisHurufSession;
// Removed QuisHurufSessionSoal import - no longer needed
use App\Models\SoalQuisHuruf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;

class QuisController extends Controller
{

    private function calculateNextLevelExp($currentLevel)
    {
        $levelConfigs = config('exp.levels'); // ambil dari config/exp.php
     
        // Ambil semua level yang tersedia
        $availableLevels = array_keys($levelConfigs);
    
        // Ambil level maksimal dari config
        $maxLevel = max($availableLevels);

        // Kalau sudah level max, tidak bisa naik lagi
        if ($currentLevel >= $maxLevel) {
            return null; // null = tidak ada level berikutnya
        }
        
        return $levelConfigs[$currentLevel]['max_exp'] ?? null;
    }

    private function getUnlockedFeatures($level)
    {
        $features = [];
        
        switch ($level) {
            case 2:
                $features = ['Akses ke Kuis Level 2', 'Fitur Latihan Tambahan'];
                break;
            case 3:
                $features = ['Akses ke Kuis Level 3', 'Fitur Flashcard'];
                break;
            case 4:
                $features = ['Akses ke Kuis Level 4', 'Fitur Review Otomatis'];
                break;
            case 5:
                $features = ['Akses ke Kuis Level 5', 'Fitur Statistik Belajar'];
                break;
            default:
                $features = ['Fitur Baru Terbuka!'];
        }
        
        return $features;
    }

    private function calculateExp($level, $attempt)
    {
        return match($level) {
            'beginner' => match($attempt) {
                1 => 9,
                2 => 6,
                3 => 3,
                default => 0,
            },
            'intermediate' => match($attempt) {
                1 => 15,
                2 => 10,
                3 => 5,
                default => 0,
            },
            'advanced' => match($attempt) {
                1 => 21,
                2 => 14,
                3 => 7,
                default => 0,
            },
            default => 0,
        };
    }

    public function pilihHurufQuisShow(){
        $this->cleanupActiveQuisSession();
        $user = Auth::user();
        
        // OPTIMIZATION: Use eager loading and cache user progress
        $progressHuruf = cache()->remember("user_progress_{$user->id}", 300, function() use ($user) {
            return $user->hurufs()
                ->select('jenis_huruf')
                ->wherePivot('is_learned', true)
                ->get()
                ->pluck('jenis_huruf');
        });
       
        //check yang jumlah jenisnya hiragana atau katakana
        $jumlahHiragana = $progressHuruf->countBy()->get('hiragana', 0);
        $jumlahKatakana = $progressHuruf->countBy()->get('katakana', 0);
    
       
        return Inertia::render('User/Pilih-Huruf-Quis',[
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'jumlahHiragana' => $jumlahHiragana,
            'jumlahKatakana' => $jumlahKatakana,
        ]);
    }

    public function pilihLevelQuisShow($jenis){
        $this->cleanupActiveQuisSession();
        $user = Auth::user();
        //ambil progress belajar user huruf & check kategori huruf
        $progressHuruf = $user->hurufs()->wherePivot('is_learned', true)->where('jenis_huruf', $jenis)->count();
        
        return Inertia::render('User/Pilih-Level-Quis',[
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'jenis' => $jenis,
            'progressHuruf' => $progressHuruf,
            'isRandomMode' => true, // Enable random mode
        ]);
    }

    public function pilihListHurufQuis(Request $request){
        $this->cleanupActiveQuisSession();
        $user = Auth::user();
        $jenis = $request->query('jenis');
        $level = $request->query('level');
        $mode = $request->query('mode', 'manual'); // Default to manual mode
        
        // Get user's progress for this type of letter
        $progressHuruf = $user->hurufs()->wherePivot('is_learned', true)->where('jenis_huruf', $jenis)->count();
        
        // Validate access based on level and mode
        $minLettersRequired = match($level) {
            'beginner' => 10,
            'intermediate' => 46,
            'advanced' => 71,
            default => 10,
        };
        
        // Hanya level intermediate & advanced (mode apapun) yang divalidasi
        if (($level === 'intermediate' || $level === 'advanced') && $progressHuruf < $minLettersRequired) {
            return redirect()->back()->with('error', "Untuk level $level, kamu perlu mempelajari minimal $minLettersRequired huruf terlebih dahulu.");
        }
       
        // Base query for letters
        if ($mode === 'random') {
            // For random mode, get all letters regardless of learning status
            $query = \App\Models\Huruf::where('jenis_huruf', $jenis)
                ->with(['contohPenggunaans' => function($query) {
                    $query->take(1); // Get only first example
                }]);
        } else {
            // For manual mode, get only learned letters
            $query = $user->hurufs()
                ->wherePivot('is_learned', true)
                ->where('jenis_huruf', $jenis)
                ->with(['contohPenggunaans' => function($query) {
                    $query->take(1); // Get only first example
                }]);
        }

        // Filter by level
        switch($level) {
            case 'beginner':
                $query->where('kategori_huruf', 'gojuon');
                break;
            case 'intermediate':
                $query->whereIn('kategori_huruf', ['gojuon', 'dakuten', 'handakuten']);
                break;
            case 'advanced':
                // No additional filtering needed, get all categories
                break;
        }

        // Get the letters
        $letters = $query->get();
      

        // Transform data to match frontend structure
        $transformedLetters = $letters->map(function($letter) {
            $example = $letter->contohPenggunaans->first();
            return [
                'id' => $letter->id,
                'character' => $letter->huruf,
                'romaji' => $letter->romaji,
                'example' => $example ? "{$example->kata} ({$example->romaji}) - {$example->arti}" : null,
                'group' => $letter->groups,
                'audio' => $letter->audio
            ];
        })->values()->toArray();

       

        // Group letters by their group
        $letterGroups = collect($transformedLetters)
            ->groupBy('group')
            ->map(function($group) {
                return [
                    'id' => $group->first()['group'],
                    'name' => 'Group ' . strtoupper($group->first()['group']),
                    'count' => $group->count()
                ];
            })->values()->toArray();

        // Add "All Letters" group
        array_unshift($letterGroups, [
            'id' => 'all',
            'name' => 'Semua Huruf',
            'count' => count($transformedLetters)
        ]);

        // If random mode, we'll handle letter selection differently
        if ($mode === 'random') {
            // For random mode, we'll show a different interface
            return Inertia::render('User/Pilih-List-Huruf-Quis', [
                'user' => $user,
                'currentLevel' => $user->level,
                'currentExp' => $user->exp,
                'maxExp' => $this->calculateNextLevelExp($user->level),
                'letters' => $transformedLetters,
                'letterGroups' => $letterGroups,
                'jenis' => $jenis,
                'level' => $level,
                'mode' => $mode,
                'isRandomMode' => true
            ]);
        }

        return Inertia::render('User/Pilih-List-Huruf-Quis', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'letters' => $transformedLetters,
            'letterGroups' => $letterGroups,
            'jenis' => $jenis,
            'level' => $level,
            'mode' => $mode,
            'isRandomMode' => false
        ]);
    }

    public function startQuis(Request $request){
        $user = Auth::user();
        $this->cleanupActiveQuisSession();
        
        //validasi request
        $request->validate([
            'letters' => $request->mode === 'random' ? 'nullable|array' : 'required|array',
            'jenis' => 'required|string|in:hiragana,katakana',
            'level' => 'required|string|in:beginner,intermediate,advanced',
            'mode' => 'nullable|string|in:manual,random',
        ]);
        
        //simpan request
        $letters = $request->letters ?? [];
        $jenis = $request->jenis;
        $level = $request->level;
        $mode = $request->mode ?? 'manual';

        // Gunakan QuizService untuk optimasi
        $quizService = new \App\Services\QuizService();
        
        // Buat session dengan ULID
        $session = $quizService->createSession($user, [
            'level' => $level,
            'jenis' => $jenis,
            'mode' => $mode,
        ]);

        // Ambil soal dengan optimasi
        $transformedSoal = $quizService->getQuestions($jenis, $level, $mode, $letters);
        
        // Ambil ID soal untuk disimpan
        $soalIds = collect($transformedSoal)->pluck('id')->toArray();
        
        // Buat session soals dengan batch insert
        $quizService->createSessionSoals($user, $session, $soalIds);

        return redirect()->route('quis', ['sessionId' => $session->id]);
    }

    public function QuisShow($sessionId){
        $user = Auth::user();
        
        //ambil session quis
        $session = QuisHurufSession::where('id', $sessionId)
        ->where('id_user', $user->id)
        ->firstOrFail();

        //check apakah session masih aktif
        if($session->ended_at !== null && now()->isAfter($session->ended_at)){
            return redirect()->route('review-quis');
        }

        // OPTIMIZATION: Get questions from JSON field instead of individual records
        $selectedSoalIds = $session->selected_soals ?? [];
        
        // Get soal data from IDs stored in JSON
        $soals = SoalQuisHuruf::whereIn('id', $selectedSoalIds)->get();
        
        // Get answered questions from JSON field
        $userAnswers = $session->user_answers ?? [];

        //transform data menjadi format yang sama dengan quizData
        $transformedSoal = [];
        $answeredQuestions = 0;

        foreach($soals as $soal){
            $options = [
                [
                    'id' => 'A',
                    'text' => $soal->option_a,
                    'isCorrect' => $soal->correct_answer == 'a'
                ],
                [
                    'id' => 'B',
                    'text' => $soal->option_b,
                    'isCorrect' => $soal->correct_answer == 'b'
                ],
                [
                    'id' => 'C',
                    'text' => $soal->option_c,
                    'isCorrect' => $soal->correct_answer == 'c'
                ],
                [
                    'id' => 'D',
                    'text' => $soal->option_d,
                    'isCorrect' => $soal->correct_answer == 'd'
                ],
            ];

            // Check if this soal has been answered from JSON
            $answeredData = $userAnswers[$soal->id] ?? null;
            $isAnswered = $answeredData !== null;
            
            if ($isAnswered) {
                $answeredQuestions++;
                $exp = $answeredData['exp'];
                $attempt = $answeredData['attempt'];
                $isCorrect = $answeredData['is_correct'];
                $userAnswer = $answeredData['answer'];
            } else {
                // Calculate potential EXP for unanswered questions using JSON-based tracking
                $attempts = $session->attempts ?? [];
                $totalAttempt = $attempts[$soal->id] ?? 0;
                $attempt = $totalAttempt + 1;
                $exp = $this->calculateExp($session->level, $attempt);
                $isCorrect = false;
                $userAnswer = null;
            }

            $transformedSoal[] = [
                'id' => $soal->id,
                'question' => $soal->question,
                'character' => $soal->character,
                'options' => $options,
                'exp' => $exp,
                'attempt' => $attempt,
                'is_correct' => $isCorrect,
                'user_answer' => $userAnswer,
            ];
        }

        // Shuffle questions for random mode
        if ($session->mode === 'random') {
            $transformedSoal = collect($transformedSoal)->shuffle()->toArray();
        }

        // Set current question index ke soal yang belum dijawab
        $currentQuestionIndex = $answeredQuestions;

        //hitung sisa waktu
        $remainingTime = $session->waktu_max - now()->diffInSeconds($session->started_at);

        return Inertia::render('User/Quis',[
            'quizData' => $transformedSoal,
            'remainingTime' => $remainingTime,
            'sessionId' => $sessionId,
            'jenis' => $session->jenis_huruf,
            'level' => $session->level,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'user' => $user,
            'currentQuestionIndex' => $currentQuestionIndex,
        ]);
    }

    public function ReviewQuisShow($sessionId){
        $user = Auth::user();
       
        //ambil session quis
        $session = QuisHurufSession::where('id', $sessionId)
        ->where('id_user', $user->id)
        ->firstOrFail();

        // OPTIMIZATION: Get questions from JSON field instead of individual records
        $selectedSoalIds = $session->selected_soals ?? [];
        
        // Get soal data from IDs stored in JSON
        $soals = SoalQuisHuruf::whereIn('id', $selectedSoalIds)->get();
        
        // Get answered questions from JSON field
        $userAnswers = $session->user_answers ?? [];

        //hitung total exp berdasarkan soal yang dijawab benar dengan perhitungan ulang
        $totalExp = 0;
        foreach ($soals as $soal) {
            $answeredData = $userAnswers[$soal->id] ?? null;
            if ($answeredData && ($answeredData['is_correct'] ?? false)) {
                $totalExp += $answeredData['exp'] ?? 0;
            }
        }

        // Transform data untuk frontend
        $answers = [];
        foreach ($soals as $soal) {
            $answeredData = $userAnswers[$soal->id] ?? null;
            
            if ($answeredData) {
                // Soal sudah dijawab
                $answers[] = [
                    'id' => $soal->id,
                    'question' => $soal->question,
                    'character' => $soal->character,
                    'userAnswer' => $answeredData['answer'],
                    'correctAnswer' => $soal->correct_answer,
                    'isCorrect' => $answeredData['is_correct'],
                    'options' => [
                        ['id' => 'a', 'text' => $soal->option_a],
                        ['id' => 'b', 'text' => $soal->option_b],
                        ['id' => 'c', 'text' => $soal->option_c],
                        ['id' => 'd', 'text' => $soal->option_d],
                    ],
                    'expGained' => $answeredData['exp'],
                ];
            } else {
                // Soal belum dijawab (tidak seharusnya terjadi di review)
                $answers[] = [
                    'id' => $soal->id,
                    'question' => $soal->question,
                    'character' => $soal->character,
                    'userAnswer' => null,
                    'correctAnswer' => $soal->correct_answer,
                    'isCorrect' => false,
                    'options' => [
                        ['id' => 'a', 'text' => $soal->option_a],
                        ['id' => 'b', 'text' => $soal->option_b],
                        ['id' => 'c', 'text' => $soal->option_c],
                        ['id' => 'd', 'text' => $soal->option_d],
                    ],
                    'expGained' => 0,
                ];
            }
        }

        // Hitung statistik
        $totalQuestions = count($answers);
        $correctAnswers = count(array_filter($answers, fn($a) => $a['isCorrect']));
        $percentage = $totalQuestions > 0 ? round(($correctAnswers / $totalQuestions) * 100) : 0;
        if ($session->ended_at) {
            $timeSpent = $session->ended_at->diffInSeconds($session->started_at);
        } else {
            // Jika waktu habis, tampilkan waktu maksimal
            $timeSpent = $session->waktu_max;
        }

        // Check if session is already completed and EXP already added
        $sessionAlreadyCompleted = $session->ended_at !== null;
        
        if (!$sessionAlreadyCompleted) {
            // Only add EXP and update user if session is not completed yet
            $oldLevel = $user->level;
            $oldExp = $user->exp;
            $newExp = $oldExp + $totalExp;
            $nextLevelExp = $this->calculateNextLevelExp($oldLevel);
            $leveledUp = false;
            $newLevel = $oldLevel;
            $unlockedFeatures = [];

            if ($newExp >= $nextLevelExp) {
                $leveledUp = true;
                $newLevel = $oldLevel + 1;
                $unlockedFeatures = $this->getUnlockedFeatures($newLevel);
                $user->level = $newLevel;
            }
            $user->exp = $newExp;
            $user->save();

            // Update session with total exp and mark as completed
            $session->update([
                'total_exp' => $totalExp,
                'total_benar' => $correctAnswers,
                'ended_at' => now()
            ]);
        } else {
            // Session already completed, just get the data for display
            $leveledUp = false;
            $newLevel = $user->level;
            $unlockedFeatures = [];
            $nextLevelExp = $this->calculateNextLevelExp($user->level);
        }

        // Prepare quiz results data
        $quizResults = [
            'totalQuestions' => $totalQuestions,
            'correctAnswers' => $correctAnswers,
            'timeSpent' => $timeSpent,
            'percentage' => $percentage,
            'totalScore' => $sessionAlreadyCompleted ? $session->total_exp : $totalExp,
            'answers' => $answers,
            'expGained' => $sessionAlreadyCompleted ? $session->total_exp : $totalExp,
            'currentExp' => $user->exp,
            'nextLevelExp' => $nextLevelExp,
            'leveledUp' => $leveledUp,
            'newLevel' => $newLevel,
            'unlockedFeatures' => $unlockedFeatures
        ];
        
        return Inertia::render('User/Review-Quis',[
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'nextLevelExp' => $nextLevelExp,
            'quizResults' => $quizResults,
        ]);
    }

    public function saveAnswer(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'sessionId' => 'required',
            'soalId' => 'required',
            'answer' => 'required|in:a,b,c,d'
        ]);

        // Gunakan QuizService untuk optimasi
        $quizService = new \App\Services\QuizService();
        
        $result = $quizService->saveAnswer(
            $user, 
            $request->sessionId, 
            $request->soalId, 
            $request->answer
        );

        return response()->json($result);
    }

}
