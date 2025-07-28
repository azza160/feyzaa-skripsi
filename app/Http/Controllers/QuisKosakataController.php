<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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
            1 => 15,
            2 => 7,
            3 => 3,
            default => 0,
        };
    }

    // Update EXP calculation for intermediate
    private function calculateExpForIntermediate($attempt)
    {
        return match($attempt) {
            1 => 25,
            2 => 12,
            3 => 5,
            default => 0,
        };
    }

    private function calculateExpForAdvanced($attempt)
    {
        return match($attempt) {
            1 => 35,
            2 => 18,
            3 => 7,
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

        // Tentukan timer sesuai level
        $remainingTime = match($level) {
            'beginner' => 300, // 5 menit
            'intermediate' => 600, // 10 menit
            'advanced' => 720, // 12 menit
            default => 300,
        };

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
                'remaining_time' => $remainingTime,
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
            'remaining_time' => $remainingTime,
        ]);

        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'redirect' => route('quis-kosakata', ['sessionId' => $session->id])
            ]);
        }

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

        // Timer untuk intermediate
        $remainingTime = 600; // 10 menit

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
            'remaining_time' => $remainingTime, // 10 menit untuk intermediate
        ]);

        // Redirect ke halaman Quis-Kosakata-Intermediate
        return redirect()->route('quis-kosakata-intermediate', ['sessionId' => $session->id]);
    }

    public function startAdvancedSession(Request $request)
    {
        $user = Auth::user();
        $mode = $request->input('mode'); // manual/random
        $level = $request->input('level'); // harus 'advanced'
        $selectedKosakata = $request->input('selected_kosakata', []); // array of id (manual)
        $jumlahSoal = 10;
        $soalList = [];

        // Timer untuk advanced
        $remainingTime = 720; // 12 menit

        if ($level !== 'advanced') {
            abort(400, 'Level ini hanya untuk advanced.');
        }

        if ($mode === 'manual') {
            $soalQuery = \App\Models\SoalKosakata::where('level', 'advanced')
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
            $soalList = collect($soalPerKosakata)->shuffle()->take($jumlahSoal)->values()->all();
        } else if ($mode === 'random') {
            $allSoal = \App\Models\SoalKosakata::where('level', 'advanced')->get()->groupBy('kosakata_id');
            $uniqueSoal = [];
            foreach ($allSoal as $group) {
                $uniqueSoal[] = $group->random();
            }
            $soalList = collect($uniqueSoal)->shuffle()->take($jumlahSoal)->values()->all();
        } else {
            abort(400, 'Mode tidak valid.');
        }

        $selectedSoalIds = collect($soalList)->pluck('id')->toArray();

        $session = \App\Models\QuisKosakataSession::create([
            'id' => (string) \Illuminate\Support\Str::ulid(),
            'user_id' => $user->id,
            'mode' => $mode,
            'level' => $level,
            'selected_kosakata' => null,
            'selected_soal' => $selectedSoalIds,
            'user_answers' => [],
            'started_at' => now(),
            'ended' => false,
            'total_exp' => 0,
            'soal' => null,
            'remaining_time' => $remainingTime, // 12 menit untuk advanced
        ]);

        return redirect()->route('quis-kosakata-advanced', ['sessionId' => $session->id]);
    }

    public function QuisKosakataAdvancedShow($sessionId)
    {
        $user = Auth::user();
        $session = \App\Models\QuisKosakataSession::findOrFail($sessionId);

        if ($session->user_id !== $user->id) {
            abort(403, 'Unauthorized access to this quiz session.');
        }

        $level = $session->level;
        $mode = $session->mode;
        $quizData = [];

        if ($level === 'advanced') {
            $soalIds = $session->selected_soal ?? [];
            if (!is_array($soalIds) || count($soalIds) === 0) {
                abort(500, 'Data soal tidak ditemukan.');
            }
            $soalList = \App\Models\SoalKosakata::whereIn('id', $soalIds)->get();
            $soalList = $soalList->sortBy(function($soal) use ($soalIds) {
                return array_search($soal->id, $soalIds);
            })->values();
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
            abort(400, 'Level ini hanya untuk advanced.');
        }

        $currentQuestionIndex = is_array($session->user_answers) ? count($session->user_answers) : 0;
        $remainingTime = $session->remaining_time;

        return Inertia::render('User/Quis-Kosakata-Advanced', [
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
        try {
            $user = Auth::user();
            $session = \App\Models\QuisKosakataSession::where('id', $sessionId)
                ->where('user_id', $user->id)
                ->first();

            if (!$session) {
                $errorMsg = 'Session tidak ditemukan atau bukan milik user.';
                if (request()->wantsJson()) {
                    return response()->json(['error' => $errorMsg], 200);
                }
                abort(404, $errorMsg);
            }

            $userAnswers = $session->user_answers ?? [];
            $isIntermediate = $session->level === 'intermediate';
            $isAdvanced = $session->level === 'advanced';

            // Ambil soalList sesuai level
            if ($isIntermediate || $isAdvanced) {
                $soalIds = $session->selected_soal ?? [];
                if (!is_array($soalIds) || count($soalIds) === 0) {
                    $soalList = [];
                } else {
                    $soalList = \App\Models\SoalKosakata::whereIn('id', $soalIds)->get()->toArray();
                }
            } else {
                $soalList = $session->soal;
            }

            // FIX: Perhitungan waktu yang konsisten dan akurat untuk semua level
            $timeSpent = 0;
            if ($session->ended_at) {
                // Jika session sudah selesai, hitung dari remaining_time untuk akurasi
                $waktuKuis = match($session->level) {
                    'beginner' => 300, // 5 menit
                    'intermediate' => 600, // 10 menit
                    'advanced' => 720, // 12 menit
                    default => 300,
                };
                $timeSpent = $waktuKuis - ($session->remaining_time ?? 0);
            } else {
                // Jika session belum selesai, hitung dari remaining time
                $waktuKuis = match($session->level) {
                    'beginner' => 300, // 5 menit
                    'intermediate' => 600, // 10 menit
                    'advanced' => 720, // 12 menit
                    default => 300,
                };
                $timeSpent = $waktuKuis - ($session->remaining_time ?? 0);
            }
            
            // Pastikan waktu tidak negatif
            if ($timeSpent < 0) $timeSpent = 0;

            $answers = [];
            $totalExp = 0;
            $kosakataAttempts = [];

            foreach ($soalList as $idx => $soal) {
                if ($isIntermediate || $isAdvanced) {
                    // Mapping untuk intermediate dan advanced
                    $soalId = $soal['id'];
                    $kosakataId = $soal['kosakata_id'];
                    // Selalu ambil data kosakata dari tabel Kosakata
                    $kosakataModel = \App\Models\Kosakata::find($kosakataId);
                    $kosakata_kanji = $kosakataModel ? $kosakataModel->kanji : '';
                    $kosakata_furigana = $kosakataModel ? $kosakataModel->furigana : '';
                    $kosakata_romaji = $kosakataModel ? $kosakataModel->romaji : '';
                    // Hitung attempt di seluruh session KECUALI session sekarang (pakai soal_id untuk advanced)
                    if (!isset($kosakataAttempts[$kosakataId])) {
                        $kosakataAttempts[$kosakataId] = $this->getGlobalAttemptCount($user, $kosakataId, $session->id, false);
                    }
                    $pastAttempt = $kosakataAttempts[$kosakataId];
                    $answered = $userAnswers[$idx] ?? null;
                    $isCorrect = $answered ? ($answered['isCorrect'] ?? false) : false;
                    $currentAttempt = $pastAttempt;
                    if ($answered) {
                        $currentAttempt++;
                    }
                    // Tambahkan logic EXP advanced di sini
                    $exp = 0;
                    if ($isCorrect) {
                         if ($session->level === 'advanced') {
                            $exp = $this->calculateExpForAdvanced($currentAttempt);
                        } else {
                            $exp = $this->calculateExpForIntermediate($currentAttempt);
                        }
                    }
                    $totalExp += $exp;

                    $options = [
                        ['id' => 'A', 'text' => $soal['option_a']],
                        ['id' => 'B', 'text' => $soal['option_b']],
                        ['id' => 'C', 'text' => $soal['option_c']],
                        ['id' => 'D', 'text' => $soal['option_d']],
                    ];

                    $correctOption = $soal['correct_answer'];
                    $answers[] = [
                        'id' => $soal['id'],
                        'kosakata_label_kanji' => $kosakata_kanji,
                        'kosakata_label_furigana' => $kosakata_furigana,
                        'kosakata_label_romaji' => $kosakata_romaji,
                        'soal_arti' => $soal['soal_arti'] ?? '',
                        'options' => $options,
                        'correctAnswer' => $correctOption,
                        'userAnswer' => $answered['selectedAnswer'] ?? null,
                        'isCorrect' => $isCorrect,
                        'expGained' => $exp,
                    ];
                } else {
                    // Mapping untuk beginner (lama) - FIX: Tambahkan kalkulasi attempt dan EXP
                    $kosakataId = $soal['kosakata_id'] ?? null;
                    if (!$kosakataId) continue;

                    if (!isset($kosakataAttempts[$kosakataId])) {
                        $kosakataAttempts[$kosakataId] = $this->getGlobalAttemptCount($user, $kosakataId, $session->id, false);
                    }
                    $pastAttempt = $kosakataAttempts[$kosakataId];

                    $answered = $userAnswers[$idx] ?? null;
                    $userAnswer = $answered['selectedAnswer'] ?? null;
                    $correctAnswer = $soal['answer'] ?? null;
                    $correctOptionId = $this->getCorrectOptionId($soal, $correctAnswer);
                    $isCorrect = $userAnswer !== null && $userAnswer === $correctOptionId;
                    
                    $currentAttempt = $pastAttempt;
                    if ($answered) {
                        $currentAttempt++;
                    }

                    $exp = 0;
                    if ($isCorrect) {
                        $exp = $this->calculateExpForBeginner($currentAttempt);
                    }
                    $totalExp += $exp;

                    $direction = $soal['direction'] ?? 'jp_to_id';
                    $options = $soal['options'];
                    $answers[] = [
                        'id' => $soal['kosakata_id'] ?? $soal['id'],
                        'kanji' => $soal['kanji'] ?? '',
                        'arti' => $soal['arti'] ?? '',
                        'romaji' => $soal['romaji'] ?? '',
                        'options' => array_map(function($opt, $i) use ($direction) {
                            return [
                                'id' => chr(65 + $i),
                                'text' => is_array($opt) ? ($direction === 'id_to_jp' ? ($opt['kanji'] ?? '') : $opt) : $opt
                            ];
                        }, $options, array_keys($options)),
                        'correctAnswer' => $correctOptionId,
                        'userAnswer' => $userAnswer,
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

            // Check if session is already completed and EXP already added
            if (!$sessionAlreadyCompleted) {
                // Only add EXP and update user if session is not completed yet
                $oldLevel = $user->level;
                $oldExp = $user->exp;
                $newExp = $oldExp + $totalExp;
                $nextLevelExp = $this->calculateNextLevelExp($oldLevel);
                $leveledUp = false;
                $newLevel = $oldLevel;
                $unlockedFeatures = [];

                if ($nextLevelExp !== null && $newExp >= $nextLevelExp) {
                    $leveledUp = true;
                    $newLevel = $oldLevel + 1;
                    $unlockedFeatures = $this->getUnlockedFeatures($newLevel);
                    $user->level = $newLevel;
                }
                $user->exp = $newExp;
                $user->save();

                // FIX: Hanya update ended_at jika belum ada untuk mencegah perubahan waktu
                $updateData = [
                    'total_exp' => $totalExp,
                    'ended' => true
                ];
                
                // Hanya update ended_at jika belum ada
                if (!$session->ended_at) {
                    $updateData['ended_at'] = now()->setTimezone($session->started_at->timezone);
                }
                
                $session->update($updateData);
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
            
            // Handle JSON request for card completion
            if (request()->wantsJson()) {
                return response()->json([
                    'quizResults' => $quizResults,
                    'user' => $user,
                    'currentLevel' => $user->level,
                    'currentExp' => $user->exp,
                    'maxExp' => $this->calculateNextLevelExp($user->level),
                    'nextLevelExp' => $nextLevelExp,
                ]);
            }
            
            return Inertia::render('User/Review-Quis-Kosakata',[
                'user' => $user,
                'currentLevel' => $user->level,
                'currentExp' => $user->exp,
                'maxExp' => $this->calculateNextLevelExp($user->level),
                'nextLevelExp' => $nextLevelExp,
                'quizResults' => $quizResults,
            ]);
        } catch (\Throwable $e) {
            if (request()->wantsJson()) {
                return response()->json(['error' => 'Terjadi error di server: ' . $e->getMessage()], 200);
            }
            abort(500, 'Terjadi error di server: ' . $e->getMessage());
        }
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
        
        // FIX: Perhitungan waktu yang konsisten dan akurat untuk intermediate
        $timeSpent = 0;
        if ($session->ended_at) {
            // Jika session sudah selesai, hitung dari remaining_time untuk akurasi
            $waktuKuis = match($session->level) {
                'beginner' => 300, // 5 menit
                'intermediate' => 600, // 10 menit
                'advanced' => 720, // 12 menit
                default => 300,
            };
            $timeSpent = $waktuKuis - ($session->remaining_time ?? 0);
        } else {
            // Jika session belum selesai, hitung dari remaining time
            $waktuKuis = match($session->level) {
                'beginner' => 300, // 5 minutes
                'intermediate' => 600, // 10 minutes
                'advanced' => 720, // 12 minutes
                default => 300,
            };
            $timeSpent = $waktuKuis - ($session->remaining_time ?? 0);
        }
        
        // Pastikan waktu tidak negatif
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

        // PATCH: Awarding EXP hanya pada kunjungan pertama (bukan JSON) dan mencegah update ended_at berulang
        if ($session->review_visit_count < 1) {
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
            
            // FIX: Hanya update ended_at jika belum ada untuk mencegah perubahan waktu
            $updateData = [
                'total_exp' => $totalExp,
                'ended' => true,
                'review_visit_count' => $session->review_visit_count + 1,
            ];
            
            // Hanya update ended_at jika belum ada
            if (!$session->ended_at) {
                $updateData['ended_at'] = now()->setTimezone($session->started_at->timezone);
            }
            
            $session->update($updateData);
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

    public function ReviewQuisKosakataAdvancedShow($sessionId)
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
        // Urutkan soalList sesuai urutan $soalIds
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
            // Selalu ambil data kosakata dari tabel Kosakata
            $kosakataModel = \App\Models\Kosakata::find($kosakataId);
            $kosakata_kanji = $kosakataModel ? $kosakataModel->kanji : '';
            $kosakata_furigana = $kosakataModel ? $kosakataModel->furigana : '';
            $kosakata_romaji = $kosakataModel ? $kosakataModel->romaji : '';
            // Hitung attempt di seluruh session KECUALI session sekarang (pakai soal_id untuk advanced)
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
            // Tambahkan logic EXP advanced di sini
            $exp = 0;
            if ($isCorrect) {
                 if ($session->level === 'advanced') {
                    $exp = $this->calculateExpForAdvanced($currentAttempt);
                } else {
                    $exp = $this->calculateExpForIntermediate($currentAttempt);
                }
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
            $answers[] = [
                'id' => $soal['id'],
                'kosakata_label_kanji' => $kosakata_kanji,
                'kosakata_label_furigana' => $kosakata_furigana,
                'kosakata_label_romaji' => $kosakata_romaji,
                'soal_arti' => $soal['soal_arti'] ?? '',
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
        
        // FIX: Perhitungan waktu yang konsisten dan akurat untuk advanced
        $timeSpent = 0;
        if ($session->ended_at) {
            // Jika session sudah selesai, hitung dari remaining_time untuk akurasi
            $waktuKuis = match($session->level) {
                'beginner' => 300, // 5 menit
                'intermediate' => 600, // 10 menit
                'advanced' => 720, // 12 menit
                default => 300,
            };
            $timeSpent = $waktuKuis - ($session->remaining_time ?? 0);
        } else {
            // Jika session belum selesai, hitung dari remaining time
            $waktuKuis = match($session->level) {
                'beginner' => 300, // 5 menit
                'intermediate' => 600, // 10 menit
                'advanced' => 720, // 12 menit
                default => 300,
            };
            $timeSpent = $waktuKuis - ($session->remaining_time ?? 0);
        }
        
        // Pastikan waktu tidak negatif
        if ($timeSpent < 0) $timeSpent = 0;

        $sessionAlreadyCompleted = $session->ended_at !== null;

        // PATCH: Handle request JSON (card completion) untuk advanced
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
                'quizResults' => [
                    'totalQuestions' => $totalQuestions,
                    'correctAnswers' => $correctAnswers,
                    'percentage' => $percentage,
                    'answers' => $answers,
                    'expGained' => $totalExp,
                    'timeSpent' => $timeSpent,
                    'leveledUp' => $leveledUp,
                    'newLevel' => $newLevel,
                    'unlockedFeatures' => $unlockedFeatures,
                    'currentExp' => $expAfter,
                    'nextLevelExp' => $nextLevelExp,
                ],
                'user' => $user,
                'currentLevel' => $user->level,
                'currentExp' => $expAfter,
                'maxExp' => $maxExp,
                'nextLevelExp' => $nextLevelExp,
            ]);
        }

        // Awarding EXP hanya pada kunjungan pertama (bukan JSON)
        if ($session->review_visit_count < 1) {
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
                'ended_at' => now()->setTimezone($session->started_at->timezone),
                'review_visit_count' => $session->review_visit_count + 1,
            ]);
        } else {
            $leveledUp = false;
            $newLevel = $user->level;
            $unlockedFeatures = [];
            $nextLevelExp = $this->calculateNextLevelExp($user->level);
        }
        $maxExp = $this->calculateNextLevelExp($user->level) ?? $user->exp;
        return Inertia::render('User/Review-Quis-Kosakata-Advanced', [
            'quizResults' => [
                'totalQuestions' => $totalQuestions,
                'correctAnswers' => $correctAnswers,
                'percentage' => $percentage,
                'answers' => $answers,
                'expGained' => $totalExp,
                'timeSpent' => $timeSpent,
                'leveledUp' => $leveledUp ?? false,
                'newLevel' => $newLevel ?? $user->level,
                'unlockedFeatures' => $unlockedFeatures ?? [],
                'currentExp' => $user->exp,
                'nextLevelExp' => $this->calculateNextLevelExp($user->level),
            ],
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $maxExp,
            'nextLevelExp' => $this->calculateNextLevelExp($user->level),
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

    // Tambahkan helper untuk menentukan optionId benar pada beginner
    private function getCorrectOptionId($soal, $correctAnswer) {
        if (($soal['type'] ?? null) === 'jp_to_id') {
            foreach ($soal['options'] as $i => $opt) {
                if ($opt === $correctAnswer) return chr(65 + $i);
            }
        } else if (($soal['type'] ?? null) === 'id_to_jp') {
            foreach ($soal['options'] as $i => $opt) {
                if (is_array($opt) && ($opt['kanji'] ?? null) === $correctAnswer) return chr(65 + $i);
            }
        }
        return null;
    }
}
