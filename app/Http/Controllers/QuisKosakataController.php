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
        $soalList = [];

        if ($level === 'beginner') {
            // Soal disimpan di selected_kosakata (array id) dan user_answers (array)
            // Soal detail di-generate ulang dari kosakata_id di selected_kosakata
            $kosakatas = Kosakata::whereIn('id', $session->selected_kosakata)->get();
            foreach ($kosakatas as $kosakata) {
                $direction = rand(0, 1) === 0 ? 'jp_to_id' : 'id_to_jp';
                if ($direction === 'jp_to_id') {
                    $soalList[] = [
                        'type' => 'jp_to_id',
                        'kanji' => $kosakata->kanji,
                        'furigana' => $kosakata->furigana,
                        'romaji' => $kosakata->romaji,
                        'question' => 'Apa arti dari kata berikut?',
                        'options' => $this->generateOptionsIndo($kosakata->arti),
                        'answer' => $kosakata->arti,
                        'kosakata_id' => $kosakata->id
                    ];
                } else {
                    $soalList[] = [
                        'type' => 'id_to_jp',
                        'arti' => $kosakata->arti,
                        'question' => 'Apa bahasa Jepang dari kata berikut?',
                        'options' => $this->generateOptionsJepang($kosakata),
                        'answer' => $kosakata->kanji,
                        'kosakata_id' => $kosakata->id
                    ];
                }
            }
        } else {
            // Intermediate/Advanced: soal diambil dari tabel soal_kosakata
            $soalList = SoalKosakata::whereIn('id', $session->selected_soal)->get()->toArray();
        }

        return Inertia::render('User/Quis-Kosakata', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'quizData' => $soalList,
            'sessionId' => $session->id,
            'remainingTime' => 300, // TODO: bisa diatur sesuai level
            'jenis' => 'Kosakata',
            'level' => $level,
            'currentQuestionIndex' => 0,
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

        // Jika POST dari random mode, langsung buat session dan redirect ke halaman quis
        if ($request->isMethod('post') && $mode === 'random') {
            $kosakatas = \App\Models\Kosakata::inRandomOrder()->limit($jumlahSoal)->get();
            $soalList = [];
            foreach ($kosakatas as $kosakata) {
                $direction = rand(0, 1) === 0 ? 'jp_to_id' : 'id_to_jp';
                if ($direction === 'jp_to_id') {
                    $soalList[] = [
                        'type' => 'jp_to_id',
                        'kanji' => $kosakata->kanji,
                        'furigana' => $kosakata->furigana,
                        'romaji' => $kosakata->romaji,
                        'question' => 'Apa arti dari kata berikut?',
                        'options' => $this->generateOptionsIndo($kosakata->arti),
                        'answer' => $kosakata->arti,
                        'kosakata_id' => $kosakata->id
                    ];
                } else {
                    $soalList[] = [
                        'type' => 'id_to_jp',
                        'arti' => $kosakata->arti,
                        'question' => 'Apa bahasa Jepang dari kata berikut?',
                        'options' => $this->generateOptionsJepang($kosakata),
                        'answer' => $kosakata->kanji,
                        'kosakata_id' => $kosakata->id
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
            ]);
            return redirect()->route('quis-kosakata', ['sessionId' => $session->id]);
        }

        if ($level === 'beginner') {
            if ($mode === 'manual') {
                // Ambil kosakata yang dipilih user (harus sudah dipelajari)
                $kosakatas = $user->kosakatas()->wherePivot('is_learned', true)->whereIn('kosakatas.id', $selectedKosakata)->get();
            } else {
                // Ambil 10 kosakata random dari database
                $kosakatas = Kosakata::inRandomOrder()->limit($jumlahSoal)->get();
            }
            // Generate soal bidirectional (Jepang->Indo atau Indo->Jepang)
            foreach ($kosakatas as $kosakata) {
                $direction = rand(0, 1) === 0 ? 'jp_to_id' : 'id_to_jp';
                if ($direction === 'jp_to_id') {
                    $soalList[] = [
                        'type' => 'jp_to_id',
                        'kanji' => $kosakata->kanji,
                        'furigana' => $kosakata->furigana,
                        'romaji' => $kosakata->romaji,
                        'question' => 'Apa arti dari kata berikut?',
                        'options' => $this->generateOptionsIndo($kosakata->arti),
                        'answer' => $kosakata->arti,
                        'kosakata_id' => $kosakata->id
                    ];
                } else {
                    $soalList[] = [
                        'type' => 'id_to_jp',
                        'arti' => $kosakata->arti,
                        'question' => 'Apa bahasa Jepang dari kata berikut?',
                        'options' => $this->generateOptionsJepang($kosakata),
                        'answer' => $kosakata->kanji,
                        'kosakata_id' => $kosakata->id
                    ];
                }
            }
            $selectedKosakataIds = $kosakatas->pluck('id')->toArray();
        } else {
            // Intermediate/Advanced
            if ($mode === 'manual') {
                // Ambil soal dari bank soal berdasarkan kosakata yang dipilih user
                $soalQuery = SoalKosakata::whereIn('kosakata_id', $selectedKosakata)->where('level', $level);
            } else {
                // Ambil soal random dari bank soal
                $soalQuery = SoalKosakata::where('level', $level)->inRandomOrder();
            }
            $soalList = $soalQuery->limit($jumlahSoal)->get()->toArray();
            $selectedSoal = array_column($soalList, 'id');
            $selectedKosakataIds = array_column($soalList, 'kosakata_id');
        }

        // Buat session baru
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
        ]);

        // Redirect ke halaman quis dengan sessionId
        return redirect()->route('quis-kosakata', ['sessionId' => $session->id]);
    }

    // Helper untuk generate opsi jawaban Indonesia (Beginner)
    private function generateOptionsIndo($jawabanBenar)
    {
        $opsi = [$jawabanBenar];
        $opsiLain = \App\Models\Kosakata::inRandomOrder()->limit(10)->pluck('arti')->toArray();
        foreach ($opsiLain as $arti) {
            if (!in_array($arti, $opsi) && count($opsi) < 4) {
                $opsi[] = $arti;
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
        $opsiLain = \App\Models\Kosakata::inRandomOrder()->limit(10)->get();
        foreach ($opsiLain as $kosa) {
            if ($kosa->id !== $kosakata->id && count($opsi) < 4) {
                $opsi[] = [
                    'kanji' => $kosa->kanji,
                    'furigana' => $kosa->furigana,
                    'romaji' => $kosa->romaji
                ];
            }
        }
        shuffle($opsi);
        return $opsi;
    }
}
