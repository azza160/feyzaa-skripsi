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


    public function pilihHurufQuisShow(){
        $user = Auth::user();
        //ambil progress belajar user huruf & check kategori huruf
        $progressHuruf = $user->hurufs()->where('is_learned', true)->pluck('jenis_huruf') ;
       
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
     
        $user = Auth::user();
        //ambil progress belajar user huruf & check kategori huruf
        $progressHuruf = $user->hurufs()->where('is_learned', true)->where('jenis_huruf', $jenis)->count();
        
        return Inertia::render('User/Pilih-Level-Quis',[
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'jenis' => $jenis,
            'progressHuruf' => $progressHuruf,
        ]);
    }

    public function pilihListHurufQuis(Request $request){
        $user = Auth::user();
        $jenis = $request->query('jenis');
        $level = $request->query('level');
       
        // Base query for learned letters
        $query = $user->hurufs()
            ->wherePivot('is_learned', true)
            ->where('jenis_huruf', $jenis)
            ->with(['contohPenggunaans' => function($query) {
                $query->take(1); // Get only first example
            }]);

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

    

        return Inertia::render('User/Pilih-List-Huruf-Quis', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'letters' => $transformedLetters,
            'letterGroups' => $letterGroups,
            'jenis' => $jenis,
            'level' => $level
        ]);
    }

    public function startQuis(Request $request){
        $user = Auth::user();

        //validasi request
        $request->validate([
            'letters' => 'required|array',
            'jenis' => 'required|string|in:hiragana,katakana',
            'level' => 'required|string|in:beginner,intermediate,advanced',
        ]);
        
        //simpan request
        $letters = $request->letters;
        $jenis = $request->jenis;
        $level = $request->level;

        
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
            'waktu_max' => $waktu_maximal,
            'started_at' => now(),
            'ended_at' => null,
            'total_exp' => 0,
            'total_benar' => 0,
        ]);

        //ambil semua soal sesuai hruuf,level dan jenis
        $soalList = SoalQuisHuruf::whereIn('huruf_id', $letters)->where('jenis', $jenis)->where('level', $level)->get();

        //acak urutan soal
        $soalList = $soalList->shuffle();

        //transform data soal menjadi format yang sama dengan quizData
        $transformedSoal = [];
        $processedHurufIds = [];
        $idSoal = [];

        foreach($soalList as $soal){
            //skip jika huruf_id sudah diperoses
            if(in_array($soal->huruf_id, $processedHurufIds)){
                continue;
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

            //tandai huruf_id sudah diproses
            $processedHurufIds[] = $soal->huruf_id;
        }

        //masukan data idSoal terpilih ke table quis_huruf_session_soals
        foreach($idSoal as $id){
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

                $sessionSoal = QuisHurufSessionSoal::create([
                    'id_user' => $user->id,
                    'session_id' => $session->id,
                    'soal_id' => $id,
                    'attempt' => $attempt,
                    'user_answer' => null,
                    'is_correct' => false,
                ]);
            }
        }

        //modfikasi transformedSoal dengan menambahkan field exp
        foreach($transformedSoal as &$soal){
            //tentukan exp berdasarkan level
            $exp = match($level){
                'beginner' => 9,
                'intermediate' => 15,
                'advanced' => 21,
                default => 9,
            };
            //tambahkan field exp ke soal
            $soal['exp'] = $exp;
        }

        return redirect()->route('quis', ['sessionId' => $session->id]);
    }

    public function QuisShow($sessionId){
        $user = Auth::user();
        
        //ambil session quis
        $session = QuisHurufSession::with('sessionSoals')->where('id', $sessionId)
        ->where('id_user', $user->id)
        ->firstOrFail();

        //check apakaah session masih aktif
        if(now()->isAfter($session->ended_at)){
            return redirect()->route('review-quis');
        }

        //ambil semua data pivot untuk sesi ini
        $sessionSoals = QuisHurufSessionSoal::with('soal')
        ->where('session_id', $sessionId)
        ->where('id_user', $user->id)
        ->get();

        //transform data pivot menjadi format yang sama dengan transformedSoal
        $transformedSoal = [];
        foreach($sessionSoals as $sessionSoal){
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

           //tentukan exp berdasarkan level dan attempt
           $attempt = $sessionSoal->attempt;
           $level = $session->level;
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
            'exp' => $exp,
           ]);

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
           
        }


        //hitung siswa waktu
        $remainingTime = now()->diffInSeconds($session->started_at,false);

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
        ]);
        
        
    
    }

    public function ReviewQuisShow(){
        $user = Auth::user();
        return Inertia::render('User/Review-Quis',[
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
        ]);
    }
        
        


}
