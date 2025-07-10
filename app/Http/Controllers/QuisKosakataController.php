<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Kosakata;
use App\Models\QuisKosakataSession;
use App\Models\SoalKosakata;
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

    public function pilihLevelQuisShow(){
        $user = Auth::user();
        // Ambil progress kosakata yang sebenarnya dari database
        $progressKosakata = $user->kosakatas()->wherePivot('is_learned', true)->count();
        $totalKosakata = \App\Models\Kosakata::count();

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
        $kosakatas = $user->kosakatas()
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

        if ($level === 'beginner') {
            if ($mode === 'manual') {
                $kosakatas = $user->kosakatas()->wherePivot('is_learned', true)->whereIn('kosakatas.id', $selectedKosakata)->get();
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
        } else {
            if ($mode === 'manual') {
                $soalQuery = SoalKosakata::whereIn('kosakata_id', $selectedKosakata)->where('level', $level);
            } else {
                $soalQuery = SoalKosakata::where('level', $level)->inRandomOrder();
            }
            $soalList = $soalQuery->limit($jumlahSoal)->get()->toArray();
            $selectedSoal = array_column($soalList, 'id');
            $selectedKosakataIds = array_column($soalList, 'kosakata_id');
        }
        // --- FIX: Jangan shuffle ulang soalList, urutan sudah fix saat dibuat ---
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
            ->firstOrFail();

        $userAnswers = $session->user_answers ?? [];
        $soalList = $session->soal;
        if (!$soalList || !is_array($soalList) || count($soalList) === 0) {
            abort(500, 'Data soal pada sesi kuis ini tidak ditemukan. Silakan mulai ulang kuis.');
        }
        $answers = [];
        $totalExp = 0;
        $expPerSoal = 18;
        $kosakataAttempts = [];
        foreach ($soalList as $idx => $soal) {
            $kosakataId = $soal['kosakata_id'] ?? $soal['id'];
            // Hitung attempt per kosakata
            if (!isset($kosakataAttempts[$kosakataId])) {
                $kosakataAttempts[$kosakataId] = \App\Models\QuisKosakataSession::where('user_id', $user->id)
                    ->where('ended', true)
                    ->whereJsonContains('selected_kosakata', $kosakataId)
                    ->count();
            }
            $answered = $userAnswers[$idx] ?? null;
            $isCorrect = $answered ? ($answered['isCorrect'] ?? false) : false;
            // EXP hanya diberikan jika attempt kosakata < 3
            $exp = ($kosakataAttempts[$kosakataId] < 3 && $isCorrect) ? $expPerSoal : 0;
            $totalExp += $exp;
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
                'correctAnswer' => $soal['answer'],
                'userAnswer' => $answered['selectedAnswer'] ?? null,
                'isCorrect' => $isCorrect,
                'expGained' => $exp,
                'attempt' => $kosakataAttempts[$kosakataId],
            ];
        }
        $totalQuestions = count($answers);
        $correctAnswers = count(array_filter($answers, fn($a) => $a['isCorrect']));
        $percentage = $totalQuestions > 0 ? round(($correctAnswers / $totalQuestions) * 100) : 0;
        $sessionAlreadyCompleted = $session->ended;
        if (!$sessionAlreadyCompleted) {
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
            $session->update([
                'total_exp' => $expToAdd,
                'ended' => true,
                // ended_at tetap diisi di sini (pertama kali review)
            ]);
        } else {
            $leveledUp = false;
            $newLevel = $user->level;
            $unlockedFeatures = [];
            $nextLevelExp = $this->calculateNextLevelExp($user->level);
        }
        $maxExp = $nextLevelExp ?? $user->exp;
        // --- Gunakan remaining_time untuk timeSpent ---
        $waktuKuis = 300; // detik (5 menit)
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
            'nextLevelExp' => $nextLevelExp,
            'leveledUp' => $leveledUp,
            'newLevel' => $newLevel,
            'unlockedFeatures' => $unlockedFeatures,
            'timeSpent' => $timeSpent,
        ];
        return Inertia::render('User/Review-Quis-Kosakata', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $maxExp,
            'nextLevelExp' => $nextLevelExp,
            'quizResults' => $quizResults,
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
