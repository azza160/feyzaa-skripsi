<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Models\Kosakata;

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
        
        // Ambil kosakata yang sudah dipelajari user dari database
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
            'level' => $level
        ]);
    }

    public function QuisKosakataShow($sessionId){
        $user = Auth::user();
        
        // Untuk sementara, kita gunakan dummy data
        // Nanti bisa diintegrasikan dengan database
        $quizData = [
            [
                'id' => 1,
                'question' => 'Apa arti dari kosakata ini?',
                'kosakata' => [
                    'kanji' => '学生',
                    'furigana' => 'がくせい',
                    'romaji' => 'gakusei'
                ],
                'options' => [
                    ['id' => 'A', 'text' => 'Guru', 'isCorrect' => false],
                    ['id' => 'B', 'text' => 'Mahasiswa', 'isCorrect' => true],
                    ['id' => 'C', 'text' => 'Siswa', 'isCorrect' => false],
                    ['id' => 'D', 'text' => 'Dosen', 'isCorrect' => false]
                ]
            ],
            [
                'id' => 2,
                'question' => 'Apa arti dari kosakata ini?',
                'kosakata' => [
                    'kanji' => '食べ物',
                    'furigana' => 'たべもの',
                    'romaji' => 'tabemono'
                ],
                'options' => [
                    ['id' => 'A', 'text' => 'Minuman', 'isCorrect' => false],
                    ['id' => 'B', 'text' => 'Makanan', 'isCorrect' => true],
                    ['id' => 'C', 'text' => 'Pakaian', 'isCorrect' => false],
                    ['id' => 'D', 'text' => 'Kendaraan', 'isCorrect' => false]
                ]
            ],
            [
                'id' => 3,
                'question' => 'Apa arti dari kosakata ini?',
                'kosakata' => [
                    'kanji' => '友達',
                    'furigana' => 'ともだち',
                    'romaji' => 'tomodachi'
                ],
                'options' => [
                    ['id' => 'A', 'text' => 'Keluarga', 'isCorrect' => false],
                    ['id' => 'B', 'text' => 'Teman', 'isCorrect' => true],
                    ['id' => 'C', 'text' => 'Tetangga', 'isCorrect' => false],
                    ['id' => 'D', 'text' => 'Guru', 'isCorrect' => false]
                ]
            ],
            [
                'id' => 4,
                'question' => 'Apa arti dari kosakata ini?',
                'kosakata' => [
                    'kanji' => '本',
                    'furigana' => 'ほん',
                    'romaji' => 'hon'
                ],
                'options' => [
                    ['id' => 'A', 'text' => 'Buku', 'isCorrect' => true],
                    ['id' => 'B', 'text' => 'Pensil', 'isCorrect' => false],
                    ['id' => 'C', 'text' => 'Kertas', 'isCorrect' => false],
                    ['id' => 'D', 'text' => 'Meja', 'isCorrect' => false]
                ]
            ],
            [
                'id' => 5,
                'question' => 'Apa arti dari kosakata ini?',
                'kosakata' => [
                    'kanji' => '水',
                    'furigana' => 'みず',
                    'romaji' => 'mizu'
                ],
                'options' => [
                    ['id' => 'A', 'text' => 'Api', 'isCorrect' => false],
                    ['id' => 'B', 'text' => 'Udara', 'isCorrect' => false],
                    ['id' => 'C', 'text' => 'Air', 'isCorrect' => true],
                    ['id' => 'D', 'text' => 'Tanah', 'isCorrect' => false]
                ]
            ]
        ];

        return Inertia::render('User/Quis-Kosakata', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'quizData' => $quizData,
            'sessionId' => $sessionId,
            'remainingTime' => 300, // 5 menit
            'jenis' => 'Kosakata',
            'level' => 'Dasar',
            'currentQuestionIndex' => 0
        ]);
    }
}
