<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Kosakata;
use App\Models\QuisKosakataSession;
use App\Models\SoalKosakata;
use App\Models\User;
use Illuminate\Support\Str;

class QuisKosakataController extends Controller
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

    /**
     * Calculate EXP for beginner level based on attempt count
     * Attempt 1: 21 EXP, Attempt 2: 13 EXP, Attempt 3: 5 EXP, Attempt 4+: 0 EXP
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

    // Update EXP calculation for intermediate
    private function calculateExpForIntermediate($attempt)
    {
        return match($attempt) {
            1 => 30,
            2 => 15,
            3 => 5,
            default => 0,
        };
    }

    /**
     * Get global attempt count for a specific soal (intermediate) atau kosakata (beginner) across all sessions
     * Optionally exclude a session (for current session calculation)
     */
    private function getGlobalAttemptCount($user, $id, $excludeSessionId = null, $isIntermediate = false)
    {
        $sessions = QuisKosakataSession::where('user_id', $user->id)
            ->when($excludeSessionId, function($q) use ($excludeSessionId) {
                $q->where('id', '!=', $excludeSessionId);
            })
            ->get();

        $totalAttempts = 0;
        foreach ($sessions as $session) {
            // Untuk intermediate, cek selected_soal (array of soal_id), untuk beginner cek soal (array kosakata_id)
            if ($isIntermediate && is_array($session->selected_soal)) {
                $soalIds = $session->selected_soal;
                $userAnswers = $session->user_answers ?? [];
                foreach ($soalIds as $idx => $soalId) {
                    if ($soalId == $id && isset($userAnswers[$idx])) {
                        $totalAttempts++;
                    }
                }
            } else if (!$isIntermediate && is_array($session->soal)) {
                $soalList = $session->soal;
                foreach ($soalList as $idx => $soal) {
                    $currentKosakataId = $soal['kosakata_id'] ?? null;
                    $userAnswers = $session->user_answers ?? [];
                    if ($currentKosakataId == $id && isset($userAnswers[$idx])) {
                        $totalAttempts++;
                    }
                }
            }
        }
        return $totalAttempts;
    }

    public function pilihLevelQuisShow(){
        $user = Auth::user();
        // Ambil progress kosakata yang sebenarnya dari database
        $progressKosakata = \App\Models\User::find($user->id)->kosakatas()->wherePivot('is_learned', true)->count();
        $totalKosakata = Kosakata::count();

        return Inertia::render('User/Pilih-Level-Quis-kosakata', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'progressKosakata' => $progressKosakata,
            'totalKosakata' => $totalKosakata,
        ]);
    }

    public function pilihListQuisKosakata(Request $request){
        $user = Auth::user();
        $level = $request->query('level');
        $mode = $request->query('mode', 'manual');
        
        if ($mode === 'random') {
            // Mode random: tidak perlu ambil preview kosakata random, hanya info informatif
            return Inertia::render('User/Pilih-List-Quis-Kosakata', [
                'user' => $user,
                'currentLevel' => $user->level,
                'currentExp' => $user->exp,
                'maxExp' => $this->calculateNextLevelExp($user->level),
                'level' => $level,
                'mode' => $mode,
                'isRandomMode' => true,
            ]);
        }
        // Mode manual: ambil kosakata yang sudah dipelajari user dari database
        $kosakatas = \App\Models\User::find($user->id)->kosakatas()
            ->wherePivot('is_learned', true)
            ->get()
            ->map(function($kosakata) {
                return [
                    'id' => $kosakata->id,
                    'romaji' => $kosakata->romaji,
                    'kanji' => $kosakata->kanji,
                    'furigana' => $kosakata->furigana,
                    'arti' => $kosakata->arti,
                    'contoh' => $kosakata->contohKalimats->first() ? 
                        $kosakata->contohKalimats->first()->kalimat_jepang . ' (' . $kosakata->contohKalimats->first()->kalimat_indo . ')' : 
                        'Tidak ada contoh kalimat'
                ];
            })
            ->toArray();

        return Inertia::render('User/Pilih-List-Quis-Kosakata', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'kosakatas' => $kosakatas,
            'level' => $level,
            'mode' => $mode,
            'isRandomMode' => false
        ]);
    }

    public function QuisKosakataShow($sessionId)
    {
        $user = Auth::user();
        $session = \App\Models\QuisKosakataSession::findOrFail($sessionId);

        // Cek kepemilikan session
        if ($session->user_id !== $user->id) {
            abort(403, 'Unauthorized access to this quiz session.');
        }

        $level = $session->level;
        $mode = $session->mode;
        $soalList = $session->soal;

        // --- FIX: Jika soalList tidak ada, tampilkan error ---
        if (!$soalList || !is_array($soalList) || count($soalList) === 0) {
            abort(500, 'Data soal pada sesi kuis ini tidak ditemukan. Silakan mulai ulang kuis.');
        }

        // Hitung index soal terakhir yang sudah dijawab
        $currentQuestionIndex = is_array($session->user_answers) ? count($session->user_answers) : 0;

        // Ambil waktu sisa dari session
        $remainingTime = $session->remaining_time;

        return Inertia::render('User/Quis-Kosakata', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'quizData' => $soalList,
            'sessionId' => $session->id,
            'remainingTime' => $remainingTime,
            'jenis' => 'Kosakata',
            'level' => $level,
            'currentQuestionIndex' => $currentQuestionIndex,
            'mode' => $mode,
            'userAnswers' => $session->user_answers,
            'ended' => $session->ended,
        ]);
    }

    public function QuisKosakataIntermediateShow($sessionId)
    {
        $user = Auth::user();
        $session = \App\Models\QuisKosakataSession::findOrFail($sessionId);

        // Cek kepemilikan session
        if ($session->user_id !== $user->id) {
            abort(403, 'Unauthorized access to this quiz session.');
        }

        $level = $session->level;
        $mode = $session->mode;
        $quizData = [];

        if ($level === 'intermediate') {
            // Ambil array ID soal dari selected_soal
            $soalIds = $session->selected_soal ?? [];
            if (!is_array($soalIds) || count($soalIds) === 0) {
                abort(500, 'Data soal tidak ditemukan.');
            }
            // Query detail soal dari tabel soal_kosakata
            $soalList = \App\Models\SoalKosakata::whereIn('id', $soalIds)->get();
            // Urutkan soalList sesuai urutan $soalIds
            $soalList = $soalList->sortBy(function($soal) use ($soalIds) {
                return array_search($soal->id, $soalIds);
            })->values();
            // Bangun quizData sesuai struktur frontend
            $quizData = $soalList->map(function($soal) {
                return [
                    'id' => $soal->id,
                    'soal_kanji' => $soal->soal_kanji,
                    'soal_furigana' => $soal->soal_furigana,
                    'soal_romaji' => $soal->soal_romaji,
                    'soal_arti' => $soal->soal_arti,
                    'options' => [
                        [
                            'kanji' => $soal->opsi_a_kanji,
                            'furigana' => $soal->opsi_a_furigana,
                            'romaji' => $soal->opsi_a_romaji,
                            'arti' => $soal->opsi_a_arti,
                            'isCorrect' => $soal->jawaban_benar === 'a',
                        ],
                        [
                            'kanji' => $soal->opsi_b_kanji,
                            'furigana' => $soal->opsi_b_furigana,
                            'romaji' => $soal->opsi_b_romaji,
                            'arti' => $soal->opsi_b_arti,
                            'isCorrect' => $soal->jawaban_benar === 'b',
                        ],
                        [
                            'kanji' => $soal->opsi_c_kanji,
                            'furigana' => $soal->opsi_c_furigana,
                            'romaji' => $soal->opsi_c_romaji,
                            'arti' => $soal->opsi_c_arti,
                            'isCorrect' => $soal->jawaban_benar === 'c',
                        ],
                        [
                            'kanji' => $soal->opsi_d_kanji,
                            'furigana' => $soal->opsi_d_furigana,
                            'romaji' => $soal->opsi_d_romaji,
                            'arti' => $soal->opsi_d_arti,
                            'isCorrect' => $soal->jawaban_benar === 'd',
                        ],
                    ],
                    'correct_answer' => $soal->jawaban_benar,
                    'kosakata_id' => $soal->kosakata_id,
                ];
            })->toArray();
        } else {
            // Fallback ke logic lama (beginner/other): ambil dari field soal di session
            $quizData = $session->soal;
        }

        $currentQuestionIndex = is_array($session->user_answers) ? count($session->user_answers) : 0;
        $remainingTime = $session->remaining_time;

        return Inertia::render('User/Quis-Kosakata-Intermediate', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'quizData' => $quizData,
            'sessionId' => $session->id,
            'remainingTime' => $remainingTime,
            'jenis' => 'Kosakata',
            'level' => $level,
            'currentQuestionIndex' => $currentQuestionIndex,
            'mode' => $mode,
            'userAnswers' => $session->user_answers,
            'ended' => $session->ended,
        ]);
    }

    public function startSession(Request $request)
    {
        $user = Auth::user();
        $mode = $request->input('mode'); // manual/random
        $level = $request->input('level'); // beginner/intermediate/advanced
        $selectedKosakata = $request->input('selected_kosakata', []); // array of id (manual)
        $jumlahSoal = 10;
        $selectedSoal = [];
        $soalList = [];

        // FOKUS HANYA PADA LEVEL BEGINNER
        if ($level !== 'beginner') {
            abort(400, 'Level ini belum tersedia. Hanya level beginner yang tersedia saat ini.');
        }

        if ($request->isMethod('post') && $mode === 'random') {
            $kosakatas = \App\Models\Kosakata::inRandomOrder()->limit($jumlahSoal)->get();
            $soalList = [];
            foreach ($kosakatas as $kosakata) {
                $direction = rand(0, 1) === 0 ? 'jp_to_id' : 'id_to_jp';
                if ($direction === 'jp_to_id') {
                    $opsi = $this->generateOptionsIndo($kosakata->arti);
                    $soalList[] = [
                        'type' => 'jp_to_id',
                        'kanji' => $kosakata->kanji,
                        'furigana' => $kosakata->furigana,
                        'romaji' => $kosakata->romaji,
                        'question' => 'Apa arti dari kata berikut?',
                        'options' => $opsi,
                        'answer' => $kosakata->arti,
                        'kosakata_id' => $kosakata->id,
                        'direction' => 'jp_to_id',
                    ];
                } else {
                    $opsi = $this->generateOptionsJepang($kosakata);
                    $soalList[] = [
                        'type' => 'id_to_jp',
                        'arti' => $kosakata->arti,
                        'question' => 'Apa bahasa Jepang dari kata berikut?',
                        'options' => $opsi,
                        'answer' => $kosakata->kanji,
                        'kosakata_id' => $kosakata->id,
                        'direction' => 'id_to_jp',
                    ];
                }
            }
            $selectedKosakataIds = $kosakatas->pluck('id')->toArray();
            
            // --- FIX: Shuffle soalList sekali saja saat pertama kali dibuat ---
            shuffle($soalList);
            
            $session = QuisKosakataSession::create([
                'id' => (string) Str::ulid(),
                'user_id' => $user->id,
                'mode' => $mode,
                'level' => $level,
                'selected_kosakata' => $selectedKosakataIds,
                'selected_soal' => [],
                'user_answers' => [],
                'started_at' => now(),
                'ended' => false,
                'total_exp' => 0,
                'soal' => $soalList,
                'remaining_time' => 300,
            ]);
            return redirect()->route('quis-kosakata', ['sessionId' => $session->id]);
        }

        // HANYA UNTUK LEVEL BEGINNER
        if ($mode === 'manual') {
            $kosakatas = \App\Models\User::find($user->id)->kosakatas()
                ->wherePivot('is_learned', true)
                ->whereIn('kosakatas.id', $selectedKosakata)
                ->get();
        } else {
            $kosakatas = Kosakata::inRandomOrder()->limit($jumlahSoal)->get();
        }
        
        foreach ($kosakatas as $kosakata) {
            $direction = rand(0, 1) === 0 ? 'jp_to_id' : 'id_to_jp';
            if ($direction === 'jp_to_id') {
                $opsi = $this->generateOptionsIndo($kosakata->arti);
                $soalList[] = [
                    'type' => 'jp_to_id',
                    'kanji' => $kosakata->kanji,
                    'furigana' => $kosakata->furigana,
                    'romaji' => $kosakata->romaji,
                    'question' => 'Apa arti dari kata berikut?',
                    'options' => $opsi,
                    'answer' => $kosakata->arti,
                    'kosakata_id' => $kosakata->id,
                    'direction' => 'jp_to_id',
                ];
            } else {
                $opsi = $this->generateOptionsJepang($kosakata);
                $soalList[] = [
                    'type' => 'id_to_jp',
                    'arti' => $kosakata->arti,
                    'question' => 'Apa bahasa Jepang dari kata berikut?',
                    'options' => $opsi,
                    'answer' => $kosakata->kanji,
                    'kosakata_id' => $kosakata->id,
                    'direction' => 'id_to_jp',
                ];
            }
        }
        $selectedKosakataIds = $kosakatas->pluck('id')->toArray();
        
        // --- FIX: Shuffle soalList sekali saja saat pertama kali dibuat ---
        shuffle($soalList);
        $session = QuisKosakataSession::create([
            'id' => (string) Str::ulid(),
            'user_id' => $user->id,
            'mode' => $mode,
            'level' => $level,
            'selected_kosakata' => $selectedKosakataIds,
            'selected_soal' => $selectedSoal,
            'user_answers' => [],
            'started_at' => now(),
            'ended' => false,
            'total_exp' => 0,
            'soal' => $soalList,
            'remaining_time' => 300,
        ]);
        return redirect()->route('quis-kosakata', ['sessionId' => $session->id]);
    }

    public function startIntermediateSession(Request $request)
    {
        $user = Auth::user();
        $mode = $request->input('mode'); // manual/random
        $level = $request->input('level'); // harus 'intermediate'
        $selectedKosakata = $request->input('selected_kosakata', []); // array of id (manual)
        $jumlahSoal = 10;
        $soalList = [];

        if ($level !== 'intermediate') {
            abort(400, 'Level ini hanya untuk intermediate.');
        }

        if ($mode === 'manual') {
            $soalQuery = \App\Models\SoalKosakata::where('level', 'intermediate')
                ->whereIn('kosakata_id', $selectedKosakata)
                ->get()
                ->groupBy('kosakata_id');
            $soalPerKosakata = [];
            foreach ($selectedKosakata as $kosakataId) {
                $soals = $soalQuery->get($kosakataId, collect());
                if ($soals->count() > 0) {
                    $soalPerKosakata[] = $soals->random();
                }
            }
            // Acak urutan soal agar tidak sesuai urutan database/kosakata
            $soalList = collect($soalPerKosakata)->shuffle()->take($jumlahSoal)->values()->all();
        } else if ($mode === 'random') {
            // Ambil semua soal intermediate, group by kosakata_id
            $allSoal = \App\Models\SoalKosakata::where('level', 'intermediate')->get()->groupBy('kosakata_id');
            $uniqueSoal = [];
            foreach ($allSoal as $group) {
                // Ambil satu soal random untuk setiap kosakata_id
                $uniqueSoal[] = $group->random();
            }
            // Acak hasil dan ambil sejumlah $jumlahSoal
            $soalList = collect($uniqueSoal)->shuffle()->take($jumlahSoal)->values()->all();
        } else {
            abort(400, 'Mode tidak valid.');
        }

        // Ambil hanya ID soal untuk disimpan di session, urutannya sudah diacak
        $selectedSoalIds = collect($soalList)->pluck('id')->toArray();

        // Simpan session: soal=null, selected_kosakata=null, selected_soal=ID soal (sudah diacak)
        $session = QuisKosakataSession::create([
            'id' => (string) \Illuminate\Support\Str::ulid(),
            'user_id' => $user->id,
            'mode' => $mode,
            'level' => $level,
            'selected_kosakata' => null, // intermediate: tidak perlu
            'selected_soal' => $selectedSoalIds, // urutan sudah diacak
            'user_answers' => [],
            'started_at' => now(),
            'ended' => false,
            'total_exp' => 0,
            'soal' => null, // intermediate: tidak perlu simpan soal
            'remaining_time' => 600, // 10 menit untuk intermediate
        ]);

        // Redirect ke halaman Quis-Kosakata-Intermediate
        return redirect()->route('quis-kosakata-intermediate', ['sessionId' => $session->id]);
    }

    public function saveAnswer(Request $request)
    {
        $user = Auth::user();
        $sessionId = $request->input('sessionId');
        $questionIndex = $request->input('questionIndex');
        $selectedAnswer = $request->input('selectedAnswer');
        $isCorrect = $request->input('isCorrect');
        $waktuJawab = $request->input('waktuJawab');

        $session = QuisKosakataSession::findOrFail($sessionId);
        if ($session->user_id !== $user->id) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
        }
        $userAnswers = $session->user_answers ?? [];
        $userAnswers[$questionIndex] = [
            'selectedAnswer' => $selectedAnswer,
            'isCorrect' => $isCorrect,
            'waktuJawab' => $waktuJawab,
        ];
        $session->user_answers = $userAnswers;
        $session->save();

        $remainingTime = $request->input('remainingTime');
        if ($remainingTime !== null) {
            $session->remaining_time = $remainingTime;
            $session->save();
        }
        return response()->json(['success' => true]);
    }

    public function deleteSession(Request $request)
    {
        $user = Auth::user();
        $sessionId = $request->input('sessionId');
        $session = QuisKosakataSession::find($sessionId);
        if ($session && $session->user_id === $user->id) {
            $session->delete();
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false, 'message' => 'Session not found or unauthorized'], 404);
    }

    public function ReviewQuisKosakataShow($sessionId)
    {
        $user = Auth::user();
        $session = \App\Models\QuisKosakataSession::where('id', $sessionId)
            ->where('user_id', $user->id)
            ->first();

        if (!$session) {
            $errorMsg = 'Session tidak ditemukan atau bukan milik user.';
            if (request()->wantsJson()) {
                return response()->json(['error' => $errorMsg], 404);
            }
            abort(404, $errorMsg);
        }

        $userAnswers = $session->user_answers ?? [];
        $isIntermediate = $session->level === 'intermediate';

        // Ambil soalList sesuai level
        if ($isIntermediate) {
            $soalIds = $session->selected_soal ?? [];
            if (!is_array($soalIds) || count($soalIds) === 0) {
                $soalList = [];
            } else {
                $soalList = \App\Models\SoalKosakata::whereIn('id', $soalIds)->get()->toArray();
            }
        } else {
            $soalList = $session->soal;
        }

        if (!$soalList || !is_array($soalList) || count($soalList) === 0) {
            $errorMsg = 'Data soal pada sesi kuis ini tidak ditemukan. Silakan mulai ulang kuis.';
            if (request()->wantsJson()) {
                return response()->json(['error' => $errorMsg], 500);
            }
            abort(500, $errorMsg);
        }

        $answers = [];
        $totalExp = 0;
        $kosakataAttempts = [];

        foreach ($soalList as $idx => $soal) {
            $kosakataId = $isIntermediate
                ? ($soal['kosakata_id'] ?? $soal['id'] ?? null)
                : ($soal['kosakata_id'] ?? $soal['id']);
            if (!$kosakataId) continue;
            if (!isset($kosakataAttempts[$kosakataId])) {
                $kosakataAttempts[$kosakataId] = $this->getGlobalAttemptCount($user, $kosakataId, $session->id);
            }
            $pastAttempt = $kosakataAttempts[$kosakataId];
            $answered = $userAnswers[$idx] ?? null;
            $isCorrect = $answered ? ($answered['isCorrect'] ?? false) : false;
            $currentAttempt = $pastAttempt;
            if ($answered) {
                $currentAttempt++;
            }
            $exp = 0;
            if ($isCorrect && $session->level === 'beginner') {
                $exp = $this->calculateExpForBeginner($currentAttempt);
            }
            $totalExp += $exp;
            if ($isIntermediate) {
                $correctOption = null;
                $options = [
                    [
                        'kanji' => $soal['opsi_a_kanji'] ?? '',
                        'furigana' => $soal['opsi_a_furigana'] ?? '',
                        'romaji' => $soal['opsi_a_romaji'] ?? '',
                        'isCorrect' => ($soal['jawaban_benar'] ?? '') === 'a',
                    ],
                    [
                        'kanji' => $soal['opsi_b_kanji'] ?? '',
                        'furigana' => $soal['opsi_b_furigana'] ?? '',
                        'romaji' => $soal['opsi_b_romaji'] ?? '',
                        'isCorrect' => ($soal['jawaban_benar'] ?? '') === 'b',
                    ],
                    [
                        'kanji' => $soal['opsi_c_kanji'] ?? '',
                        'furigana' => $soal['opsi_c_furigana'] ?? '',
                        'romaji' => $soal['opsi_c_romaji'] ?? '',
                        'isCorrect' => ($soal['jawaban_benar'] ?? '') === 'c',
                    ],
                    [
                        'kanji' => $soal['opsi_d_kanji'] ?? '',
                        'furigana' => $soal['opsi_d_furigana'] ?? '',
                        'romaji' => $soal['opsi_d_romaji'] ?? '',
                        'isCorrect' => ($soal['jawaban_benar'] ?? '') === 'd',
                    ],
                ];
                foreach ($options as $i => $opt) {
                    if (!empty($opt['isCorrect'])) {
                        $correctOption = [
                            'id' => chr(97 + $i), // 'a', 'b', 'c', 'd'
                            'kanji' => $opt['kanji'] ?? '',
                            'furigana' => $opt['furigana'] ?? '',
                            'romaji' => $opt['romaji'] ?? '',
                        ]; 
                        break;
                    }
                }
                $answers[] = [
                    'id' => $kosakataId,
                    'soal_kanji' => $soal['soal_kanji'] ?? '',
                    'soal_furigana' => $soal['soal_furigana'] ?? '',
                    'soal_romaji' => $soal['soal_romaji'] ?? '',
                    'options' => array_map(function($opt, $i) {
                        return [
                            'id' => chr(97 + $i),
                            'kanji' => $opt['kanji'] ?? '',
                            'furigana' => $opt['furigana'] ?? '',
                            'romaji' => $opt['romaji'] ?? '',
                        ];
                    }, $options, array_keys($options)),
                    'correctAnswer' => $correctOption,
                    'userAnswer' => $answered['selectedAnswer'] ?? null,
                    'isCorrect' => $isCorrect,
                    'expGained' => $exp,
                    'attempt' => $currentAttempt,
                ];
            } else {
                // Mapping untuk beginner (lama)
                $direction = $soal['direction'] ?? 'jp_to_id';
                $options = $soal['options'];
                $answers[] = [
                    'id' => $kosakataId,
                    'kanji' => $soal['kanji'] ?? '',
                    'arti' => $soal['arti'] ?? '',
                    'romaji' => $soal['romaji'] ?? '',
                    'options' => array_map(function($opt, $i) use ($direction) {
                        return [
                            'id' => chr(65 + $i),
                            'text' => is_array($opt) ? ($direction === 'id_to_jp' ? $opt['kanji'] : $opt) : $opt
                        ];
                    }, $options, array_keys($options)),
                    'correctAnswer' => $soal['answer'] ?? null,
                    'userAnswer' => $answered['selectedAnswer'] ?? null,
                    'isCorrect' => $isCorrect,
                    'expGained' => $exp,
                    'attempt' => $currentAttempt,
                ];
            }
        }

        $totalQuestions = count($answers);
        $correctAnswers = count(array_filter($answers, fn($a) => $a['isCorrect']));
        $percentage = $totalQuestions > 0 ? round(($correctAnswers / $totalQuestions) * 100) : 0;
        $sessionAlreadyCompleted = $session->ended_at !== null;

        // === PATCH: Gunakan review_visit_count untuk awarding EXP hanya pada kunjungan pertama ===
        if ($session->review_visit_count < 1 && !request()->wantsJson()) {
            // Pastikan $user adalah instance Eloquent User
            if (!($user instanceof \App\Models\User)) {
                $user = \App\Models\User::find($user['id']);
            }
            $expToAdd = $totalExp;
            $newExp = $user->exp + $expToAdd;
            $leveledUp = false;
            $oldLevel = $user->level;
            $nextLevelExp = $this->calculateNextLevelExp($oldLevel);
            $maxLevel = max(array_keys(config('exp.levels')));
            $newLevel = $oldLevel;
            $unlockedFeatures = [];
            if ($nextLevelExp && $newExp >= $nextLevelExp && $oldLevel < $maxLevel) {
                $leveledUp = true;
                $newLevel = $oldLevel + 1;
                $unlockedFeatures = $this->getUnlockedFeatures($newLevel);
                $user->level = $newLevel;
            }
            $user->exp = $newExp;
            $user->save();
            $user->refresh();
            $session->update([
                'total_exp' => $expToAdd,
                'ended' => true,
                'ended_at' => now(),
                'review_visit_count' => $session->review_visit_count + 1,
            ]);
        } else if ($session->review_visit_count >= 1 && !request()->wantsJson()) {
            // Sudah pernah review, hanya render hasil
            $leveledUp = false;
            $newLevel = $user->level;
            $unlockedFeatures = [];
            $nextLevelExp = $this->calculateNextLevelExp($user->level);
        }

        $maxExp = $this->calculateNextLevelExp($user->level) ?? $user->exp;
        $waktuKuis = $session->level === 'intermediate' ? 600 : 300;
        $timeSpent = $waktuKuis - ($session->remaining_time ?? 0);
        if ($timeSpent < 0) $timeSpent = 0;

        $quizResults = [
            'totalQuestions' => $totalQuestions,
            'correctAnswers' => $correctAnswers,
            'percentage' => $percentage,
            'totalScore' => $totalExp,
            'answers' => $answers,
            'expGained' => $totalExp,
            'currentExp' => $user->exp,
            'nextLevelExp' => $this->calculateNextLevelExp($user->level),
            'leveledUp' => $leveledUp ?? false,
            'newLevel' => $newLevel ?? $user->level,
            'unlockedFeatures' => $unlockedFeatures ?? [],
            'timeSpent' => $timeSpent,
        ];

        // PATCH: Handle request JSON (card completion) - PASTIKAN DITEMPATKAN DI SINI!
        if (request()->wantsJson()) {
            if (!$session->ended) {
                $session->update(['ended' => true]);
            }
            $quizResults = [
                'totalQuestions' => $totalQuestions,
                'correctAnswers' => $correctAnswers,
                'percentage' => $percentage,
                'totalScore' => $totalExp,
                'answers' => $answers,
                'expGained' => $totalExp,
                'currentExp' => $user->exp,
                'nextLevelExp' => $this->calculateNextLevelExp($user->level),
                'leveledUp' => false,
                'newLevel' => $user->level,
                'unlockedFeatures' => [],
                'timeSpent' => $timeSpent,
            ];
            return response()->json([
                'quizResults' => $quizResults,
                'user' => $user,
                'currentLevel' => $user->level,
                'currentExp' => $user->exp,
                'maxExp' => $maxExp,
                'nextLevelExp' => $this->calculateNextLevelExp($user->level),
            ]);
        }

        return Inertia::render('User/Review-Quis-Kosakata', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $maxExp,
            'nextLevelExp' => $this->calculateNextLevelExp($user->level),
            'quizResults' => $quizResults,
        ]);
    }

    public function ReviewQuisKosakataIntermediateShow($sessionId)
    {
        $user = Auth::user();
        $session = \App\Models\QuisKosakataSession::where('id', $sessionId)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $userAnswers = $session->user_answers ?? [];
        $soalIds = $session->selected_soal ?? [];
        if (!is_array($soalIds) || count($soalIds) === 0) {
            abort(500, 'Data soal pada sesi kuis ini tidak ditemukan.');
        }
        $soalList = \App\Models\SoalKosakata::whereIn('id', $soalIds)->get();
        // Ambil data kosakata sekaligus agar efisien
        $kosakataMap = \App\Models\Kosakata::whereIn('id', $soalList->pluck('kosakata_id')->all())
            ->get()
            ->keyBy('id');
        // Urutkan soalList sesuai urutan $soalIds (agar konsisten dengan quis)
        $soalList = $soalList->sortBy(function($soal) use ($soalIds) {
            return array_search($soal->id, $soalIds);
        })->values();
        $soalListArr = $soalList->toArray();
        $answers = [];
        $totalExp = 0;
        $soalAttempts = [];
        foreach ($soalListArr as $idx => $soal) {
            $soalId = $soal['id'];
            $kosakataId = $soal['kosakata_id'];
            $kosakata = $kosakataMap[$kosakataId] ?? null;
            // Hitung attempt di seluruh session KECUALI session sekarang (pakai soal_id untuk intermediate)
            if (!isset($soalAttempts[$soalId])) {
                $soalAttempts[$soalId] = $this->getGlobalAttemptCount($user, $soalId, $session->id, true);
            }
            $pastAttempt = $soalAttempts[$soalId];
            $answered = $userAnswers[$idx] ?? null;
            $isCorrect = $answered ? ($answered['isCorrect'] ?? false) : false;
            $currentAttempt = $pastAttempt;
            if ($answered) {
                $currentAttempt++;
            }
            $exp = 0;
            if ($isCorrect) {
                $exp = $this->calculateExpForIntermediate($currentAttempt);
            }
            $totalExp += $exp;
            $options = [
                [
                    'id' => 'a',
                    'kanji' => $soal['opsi_a_kanji'] ?? '',
                    'furigana' => $soal['opsi_a_furigana'] ?? '',
                    'romaji' => $soal['opsi_a_romaji'] ?? '',
                    'arti' => $soal['opsi_a_arti'] ?? '',
                    'isCorrect' => ($soal['jawaban_benar'] ?? '') === 'a',
                ],
                [
                    'id' => 'b',
                    'kanji' => $soal['opsi_b_kanji'] ?? '',
                    'furigana' => $soal['opsi_b_furigana'] ?? '',
                    'romaji' => $soal['opsi_b_romaji'] ?? '',
                    'arti' => $soal['opsi_b_arti'] ?? '',
                    'isCorrect' => ($soal['jawaban_benar'] ?? '') === 'b',
                ],
                [
                    'id' => 'c',
                    'kanji' => $soal['opsi_c_kanji'] ?? '',
                    'furigana' => $soal['opsi_c_furigana'] ?? '',
                    'romaji' => $soal['opsi_c_romaji'] ?? '',
                    'arti' => $soal['opsi_c_arti'] ?? '',
                    'isCorrect' => ($soal['jawaban_benar'] ?? '') === 'c',
                ],
                [
                    'id' => 'd',
                    'kanji' => $soal['opsi_d_kanji'] ?? '',
                    'furigana' => $soal['opsi_d_furigana'] ?? '',
                    'romaji' => $soal['opsi_d_romaji'] ?? '',
                    'arti' => $soal['opsi_d_arti'] ?? '',
                    'isCorrect' => ($soal['jawaban_benar'] ?? '') === 'd',
                ],
            ];
            $correctOption = collect($options)->first(fn($opt) => $opt['isCorrect']);
            // Generate soal filled: replace blank (____) pada setiap format dengan jawaban benar
            $soalFilledKanji = $soal['soal_kanji'] ?? '';
            $soalFilledFurigana = $soal['soal_furigana'] ?? '';
            $soalFilledRomaji = $soal['soal_romaji'] ?? '';
            $soalFilledArti = $soal['soal_arti'] ?? '';
            if ($correctOption) {
                if ($soalFilledKanji) {
                    $soalFilledKanji = preg_replace('/_{2,}/', '「' . ($correctOption['kanji'] ?? '') . '」', $soalFilledKanji, 1);
                }
                if ($soalFilledFurigana) {
                    $soalFilledFurigana = preg_replace('/_{2,}/', '「' . ($correctOption['furigana'] ?? '') . '」', $soalFilledFurigana, 1);
                }
                if ($soalFilledRomaji) {
                    $soalFilledRomaji = preg_replace('/_{2,}/', '「' . ($correctOption['romaji'] ?? '') . '」', $soalFilledRomaji, 1);
                }
                if ($soalFilledArti) {
                    $soalFilledArti = preg_replace('/_{2,}/', '「' . ($correctOption['arti'] ?? '') . '」', $soalFilledArti, 1);
                }
            }
            $answers[] = [
                'id' => $soal['id'],
                'kosakata_label_kanji' => $kosakata ? $kosakata->kanji : '',
                'kosakata_label_romaji' => $kosakata ? $kosakata->romaji : '',
                'soal_kanji' => $soal['soal_kanji'] ?? '',
                'soal_furigana' => $soal['soal_furigana'] ?? '',
                'soal_romaji' => $soal['soal_romaji'] ?? '',
                'soal_arti' => $soal['soal_arti'] ?? '',
                'soal_filled_kanji' => $soalFilledKanji,
                'soal_filled_furigana' => $soalFilledFurigana,
                'soal_filled_romaji' => $soalFilledRomaji,
                'soal_filled_arti' => $soalFilledArti,
                'options' => $options,
                'correctAnswer' => $correctOption,
                'userAnswer' => $answered['selectedAnswer'] ?? null,
                'isCorrect' => $isCorrect,
                'expGained' => $exp,
            ];
        }
        $totalQuestions = count($answers);
        $correctAnswers = count(array_filter($answers, fn($a) => $a['isCorrect']));
        $percentage = $totalQuestions > 0 ? round(($correctAnswers / $totalQuestions) * 100) : 0;
        // Hitung waktu
        $waktuKuis = 600;
        $timeSpent = $waktuKuis - ($session->remaining_time ?? 0);
        if ($timeSpent < 0) $timeSpent = 0;

        $quizResults = [
            'totalQuestions' => $totalQuestions,
            'correctAnswers' => $correctAnswers,
            'percentage' => $percentage,
            'answers' => $answers,
            'expGained' => $totalExp,
            'timeSpent' => $timeSpent,
        ];

        // PATCH: Handle request JSON (card completion) - letakkan di sini!
        if (request()->wantsJson()) {
            if (!$session->ended) {
                $session->update(['ended' => true]);
            }
            // Hitung progress dan level up info
            $maxExp = $this->calculateNextLevelExp($user->level) ?? $user->exp;
            $leveledUp = false;
            $newLevel = $user->level;
            $unlockedFeatures = [];
            $nextLevelExp = $this->calculateNextLevelExp($user->level);
            // Simulasikan level up jika expGained + currentExp >= maxExp
            $expAfter = $user->exp + $totalExp;
            if ($nextLevelExp && $expAfter >= $nextLevelExp) {
                $leveledUp = true;
                $newLevel = $user->level + 1;
                $unlockedFeatures = $this->getUnlockedFeatures($newLevel);
            }
            return response()->json([
                'quizResults' => array_merge($quizResults, [
                    'leveledUp' => $leveledUp,
                    'newLevel' => $newLevel,
                    'unlockedFeatures' => $unlockedFeatures,
                    'currentExp' => $expAfter,
                    'nextLevelExp' => $nextLevelExp,
                ]),
                'user' => $user,
                'currentLevel' => $user->level,
                'currentExp' => $expAfter,
                'maxExp' => $maxExp,
                'nextLevelExp' => $nextLevelExp,
            ]);
        }

        // PATCH: Awarding EXP hanya pada kunjungan pertama (bukan JSON)
        if ($session->review_visit_count < 1) {
            // Pastikan $user adalah instance Eloquent User
            if (!($user instanceof \App\Models\User)) {
                $user = \App\Models\User::find($user['id']);
            }
            $expAfter = $user->exp + $totalExp;
            $leveledUp = false;
            $oldLevel = $user->level;
            $nextLevelExp = $this->calculateNextLevelExp($oldLevel);
            $maxLevel = max(array_keys(config('exp.levels')));
            $newLevel = $oldLevel;
            $unlockedFeatures = [];
            if ($nextLevelExp && $expAfter >= $nextLevelExp && $oldLevel < $maxLevel) {
                $leveledUp = true;
                $newLevel = $oldLevel + 1;
                $unlockedFeatures = $this->getUnlockedFeatures($newLevel);
                $user->level = $newLevel;
            }
            $user->exp = $expAfter;
            $user->save();
            $user->refresh();
            $session->update([
                'total_exp' => $totalExp,
                'ended' => true,
                'ended_at' => now(),
                'review_visit_count' => $session->review_visit_count + 1,
            ]);
        } else {
            $leveledUp = false;
            $newLevel = $user->level;
            $unlockedFeatures = [];
            $nextLevelExp = $this->calculateNextLevelExp($user->level);
        }
        $maxExp = $this->calculateNextLevelExp($user->level) ?? $user->exp;
        return Inertia::render('User/Review-Quis-Kosakata-Intermediate', [
            'quizResults' => array_merge($quizResults, [
                'leveledUp' => $leveledUp,
                'newLevel' => $newLevel,
                'unlockedFeatures' => $unlockedFeatures,
                'currentExp' => $user->exp,
                'nextLevelExp' => $nextLevelExp,
            ]),
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $maxExp,
            'nextLevelExp' => $nextLevelExp,
        ]);
    }

    // Helper untuk generate opsi jawaban Indonesia (Beginner)
    private function generateOptionsIndo($jawabanBenar)
    {
        $opsi = [$jawabanBenar];
        $used = [$jawabanBenar];
        while (count($opsi) < 4) {
            $arti = \App\Models\Kosakata::inRandomOrder()->value('arti');
            if ($arti && !in_array($arti, $used)) {
                $opsi[] = $arti;
                $used[] = $arti;
            }
        }
        shuffle($opsi);
        return $opsi;
    }

    // Helper untuk generate opsi jawaban Jepang (Beginner)
    private function generateOptionsJepang($kosakata)
    {
        $opsi = [[
            'kanji' => $kosakata->kanji,
            'furigana' => $kosakata->furigana,
            'romaji' => $kosakata->romaji
        ]];
        $used = [$kosakata->id];
        while (count($opsi) < 4) {
            $kosa = \App\Models\Kosakata::inRandomOrder()->first();
            if ($kosa && !in_array($kosa->id, $used)) {
                $opsi[] = [
                    'kanji' => $kosa->kanji,
                    'furigana' => $kosa->furigana,
                    'romaji' => $kosa->romaji
                ];
                $used[] = $kosa->id;
            }
        }
        shuffle($opsi);
        return $opsi;
    }
}
