<?php

namespace App\Http\Controllers;

use App\Models\QuisHurufSession;
use App\Models\QuisHurufSessionSoal;
use App\Models\SoalQuisHuruf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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

    public function pilihHurufQuisShow(){
        $this->cleanupActiveQuisSession();
        $user = Auth::user();
        //ambil progress belajar user huruf & check kategori huruf
        $progressHuruf = $user->hurufs()->wherePivot('is_learned', true)->pluck('jenis_huruf') ;
       
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
        
        // For intermediate and advanced levels, both modes require letter requirements
        // For beginner level, only manual mode requires letter requirements
        if ($level !== 'beginner' || $mode === 'manual') {
            if ($progressHuruf < $minLettersRequired) {
                return redirect()->back()->with('error', "Untuk level $level, kamu perlu mempelajari minimal $minLettersRequired huruf terlebih dahulu.");
            }
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

        
        //tentukan waktu maksimal
        $waktu_maximal = match($level){
            'beginner' => 240,
            'intermediate' => 180,
            'advanced' => 120,
            default => 240,
        };

        //buat session
        $session = QuisHurufSession::create([
            'id_user' => $user->id,
            'level' => $level,
            'jenis_huruf' => $jenis,
            'mode' => $mode,
            'waktu_max' => $waktu_maximal,
            'started_at' => now(),
            'ended_at' => null,
            'total_exp' => 0,
            'total_benar' => 0,
        ]);

        //ambil semua soal sesuai huruf,level dan jenis
        if ($mode === 'random') {
            // For random mode, get ALL available questions for the level and type
            // regardless of whether user has learned the letters or not
            $soalList = SoalQuisHuruf::where('jenis', $jenis)
                ->where('level', $level)
                ->get();
        } else {
            // For manual mode, get questions only for selected letters
            $soalList = SoalQuisHuruf::whereIn('huruf_id', $letters)
                ->where('jenis', $jenis)
                ->where('level', $level)
                ->get();
        }

        //acak urutan soal
        $soalList = $soalList->shuffle();

        //transform data soal menjadi format yang sama dengan quizData
        $transformedSoal = [];
        $processedHurufIds = [];
        $idSoal = [];

        foreach($soalList as $soal){
            if ($mode === 'random') {
                // For random mode, take the first 10 questions regardless of letter
                if (count($transformedSoal) >= 10) {
                    break;
                }
            } else {
                // For manual mode, skip if huruf_id already processed
                if(in_array($soal->huruf_id, $processedHurufIds)){
                    continue;
                }
            }

            //simpan id soal yang terpilih
            $idSoal[] = $soal->id;
            //ambil opsi jawaban dari soal
            $option = [
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

            //tambahkan data ke array transformedSoal
            $transformedSoal[] = [
                'id' => $soal->id,
                'question' => $soal->question,
                'character' => $soal->character,
                'options' => $option,
            ];

            //tandai huruf_id sudah diproses (only for manual mode)
            if ($mode !== 'random') {
                $processedHurufIds[] = $soal->huruf_id;
            }
        }

        //masukan data idSoal terpilih ke table quis_huruf_session_soals
        foreach($idSoal as $index => $id){
            //cari record yang sudah ada
            $existingRecord = QuisHurufSessionSoal::where('id_user', $user->id)
            ->where('session_id', $session->id)
            ->where('soal_id', $id)
            ->first();

            //jika record tidak ada, buat record baru
            if(!$existingRecord){
                $totalAttempt = QuisHurufSessionSoal::where('id_user', $user->id)
                ->where('soal_id', $id)
                ->count();

                $attempt = $totalAttempt + 1;

                // Calculate EXP based on attempt and level
                $exp = match($level){
                    'beginner' => match($attempt){
                        1 => 9,
                        2 => 6,
                        3 => 3,
                        default => 0,
                    },
                    'intermediate' => match($attempt){
                        1 => 15,
                        2 => 10,
                        3 => 5,
                        default => 0,
                    },
                    'advanced' => match($attempt){
                        1 => 21,
                        2 => 14,
                        3 => 7,
                        default => 0,
                    },
                    default => 0,
                };



                $sessionSoal = QuisHurufSessionSoal::create([
                    'id_user' => $user->id,
                    'session_id' => $session->id,
                    'soal_id' => $id,
                    'attempt' => $attempt,
                    'user_answer' => null,
                    'is_correct' => false,
                    'exp' => $exp,
                ]);

                // Update transformedSoal with the calculated EXP
                $transformedSoal[$index]['exp'] = $exp;
            }
        }

        return redirect()->route('quis', ['sessionId' => $session->id]);
    }

    public function QuisShow($sessionId){
        $user = Auth::user();
        
        //ambil session quis
        $session = QuisHurufSession::with('sessionSoals')->where('id', $sessionId)
        ->where('id_user', $user->id)
        ->firstOrFail();

        //check apakah session masih aktif
        if($session->ended_at !== null && now()->isAfter($session->ended_at)){
            return redirect()->route('review-quis');
        }

        //ambil semua data pivot untuk sesi ini
        $sessionSoals = QuisHurufSessionSoal::with('soal')
        ->where('session_id', $sessionId)
        ->where('id_user', $user->id)
        ->get();

        // Shuffle questions for random mode
        if ($session->mode === 'random') {
            $sessionSoals = $sessionSoals->shuffle();
        }

        //transform data pivot menjadi format yang sama dengan transformedSoal
        $transformedSoal = [];
        $currentQuestionIndex = 0;
        $answeredQuestions = 0;

        foreach($sessionSoals as $index => $sessionSoal){
            $soal = $sessionSoal->soal;
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

            // Use the stored EXP value from the database
            // The EXP value is already calculated with the correct multiplier when the session was created
            $exp = $sessionSoal->exp;
            $attempt = $sessionSoal->attempt;

            $transformedSoal[] = [
                'id' => $soal->id,
                'question' => $soal->question,
                'character' => $soal->character,
                'options' => $options,
                'exp' => $exp,
                'attempt' => $attempt,
                'is_correct' => $sessionSoal->is_correct,
                'user_answer' => $sessionSoal->user_answer,
               
            ];

            // Jika soal ini sudah dijawab, tambahkan ke counter
            if ($sessionSoal->user_answer !== null) {
                $answeredQuestions++;
            }
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
        $session = QuisHurufSession::with('sessionSoals')->where('id', $sessionId)
        ->where('id_user', $user->id)
        ->firstOrFail();

        //ambil semua data pivot untuk sesi ini
        $sessionSoals = QuisHurufSessionSoal::with('soal')
        ->where('session_id', $sessionId)
        ->where('id_user', $user->id)
        ->get();

        //hitung total exp berdasarkan soal yang dijawab benar dengan perhitungan ulang
        $totalExp = 0;
        foreach ($sessionSoals as $sessionSoal) {
            if ($sessionSoal->is_correct) {
                $attempt = $sessionSoal->attempt;
                $level = $session->level;
                $mode = $session->mode;
                
                $exp = match($level){
                    'beginner' => match($attempt){
                        1 => 9,
                        2 => 6,
                        3 => 3,
                        default => 0,
                    },
                    'intermediate' => match($attempt){
                        1 => 15,
                        2 => 10,
                        3 => 5,
                        default => 0,
                    },
                    'advanced' => match($attempt){
                        1 => 21,
                        2 => 14,
                        3 => 7,
                        default => 0,
                    },
                    default => 0,
                };
                
                $totalExp += $exp;
            }
        }

        // Transform data untuk frontend
        $answers = $sessionSoals->map(function($sessionSoal) use ($session) {
            $soal = $sessionSoal->soal;
            
            // Recalculate EXP to ensure it's correct
            $attempt = $sessionSoal->attempt;
            $level = $session->level;
            $mode = $session->mode;
            
            $exp = match($level){
                'beginner' => match($attempt){
                    1 => 9,
                    2 => 6,
                    3 => 3,
                    default => 0,
                },
                'intermediate' => match($attempt){
                    1 => 15,
                    2 => 10,
                    3 => 5,
                    default => 0,
                },
                'advanced' => match($attempt){
                    1 => 21,
                    2 => 14,
                    3 => 7,
                    default => 0,
                },
                default => 0,
            };
            

            

            
            return [
                'id' => $soal->id,
                'question' => $soal->question,
                'character' => $soal->character,
                'userAnswer' => $sessionSoal->user_answer,
                'correctAnswer' => $soal->correct_answer,
                'isCorrect' => $sessionSoal->is_correct,
                'options' => [
                    ['id' => 'a', 'text' => $soal->option_a],
                    ['id' => 'b', 'text' => $soal->option_b],
                    ['id' => 'c', 'text' => $soal->option_c],
                    ['id' => 'd', 'text' => $soal->option_d],
                ],
                'expGained' => $exp, // Use recalculated EXP instead of stored EXP
            ];
        })->values()->toArray();

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

        $sessionSoal = QuisHurufSessionSoal::where('session_id', $request->sessionId)
            ->where('soal_id', $request->soalId)
            ->where('id_user', $user->id)
            ->firstOrFail();

        $soal = SoalQuisHuruf::findOrFail($request->soalId);
        $isCorrect = $soal->correct_answer === $request->answer;

        // Get session info for EXP calculation
        $session = QuisHurufSession::find($request->sessionId);
        
        // Calculate EXP based on attempt and level
        $attempt = $sessionSoal->attempt;
        $level = $session->level;
        $mode = $session->mode;
        
        $exp = match($level){
            'beginner' => match($attempt){
                1 => 9,
                2 => 6,
                3 => 3,
                default => 0,
            },
            'intermediate' => match($attempt){
                1 => 15,
                2 => 10,
                3 => 5,
                default => 0,
            },
            'advanced' => match($attempt){
                1 => 21,
                2 => 14,
                3 => 7,
                default => 0,
            },
            default => 0,
        };
        


        $sessionSoal->update([
            'user_answer' => $request->answer,
            'is_correct' => $isCorrect,
            'exp' => $exp
        ]);

        return response()->json([
            'success' => true,
            'is_correct' => $isCorrect,
            'exp_gained' => $isCorrect ? $exp : 0
        ]);
    }

}
