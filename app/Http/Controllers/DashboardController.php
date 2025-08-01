<?php

namespace App\Http\Controllers;

use App\Models\Huruf;
use App\Models\Kosakata;
use Inertia\Inertia;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DashboardController extends Controller
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

    public function DashboardUser()
    {
        $this->cleanupActiveQuisSession();
        $user = auth()->user();

        $hurufStats = $this->getHurufStats($user);
        $kosakataStats = $this->getKosakataStats($user);

        // mencari waktu terakhir belajar huruf dan kosa kata
        $lastCompletedAt = $user->hurufs()->wherePivot('is_learned', true)->orderBy('last_completed_at', 'desc')->first()?->pivot?->last_completed_at;
        $lastCompletedHumanReadable = $lastCompletedAt ? Carbon::parse($lastCompletedAt)->locale('id')->diffForHumans() : null;
        $lastCompletedAtKosakata = $user->kosakatas()->wherePivot('is_learned', true)->orderBy('last_completed_at', 'desc')->first()?->pivot?->last_completed_at;
        $lastCompletedHumanReadableKosakata = $lastCompletedAtKosakata ? Carbon::parse($lastCompletedAtKosakata)->locale('id')->diffForHumans() : null;

        //mencari progress pembelajaran
        $pembelajaranProgress = $user
            ->pembelajarans()
            ->orderBy('user_belajars.created_at', 'desc') // urutkan dari yang terbaru
            ->get()
               ->map(function ($pembelajaran) {
                return [
                    'id' => $pembelajaran->id,
                    'nama' => $pembelajaran->nama,
                    'desk' => $pembelajaran->desk,
                    'tipe' => $pembelajaran->tipe,
                    'max' => $pembelajaran->max,
                    'jenis' => $pembelajaran->jenis,
                    'progress' => $pembelajaran->pivot->progress ?? 0,
                    'status' => $pembelajaran->pivot->status ?? 'belum selesai',
                    'last_completed_at' => $pembelajaran->pivot->last_completed_at ? Carbon\Carbon::parse($pembelajaran->pivot->last_completed_at)->locale('id')->diffForHumans() : null,
                    'route_name' => $pembelajaran->route_name,
                    'route_params' => $pembelajaran->route_params,
                ];
            });

        return Inertia::render('User/Dashboard', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'pembelajaranProgress' => $pembelajaranProgress,
            ...$hurufStats,
            ...$kosakataStats,
            'showWelcomeAlert' => session('show_welcome_alert', false),
            'lastCompletedHumanReadable' => $lastCompletedHumanReadable,
            'lastCompletedHumanReadableKosakata' => $lastCompletedHumanReadableKosakata,
        ]);
    }

    private function getHurufStats($user)
    {
        return [
            'jumlahHuruf' => $user->hurufs()->wherePivot('is_learned', true)->count(),
            'jumlahHurufHariIni' => $user
                ->hurufs()
                ->wherePivot('is_learned', true)
                ->whereDate('last_completed_at', now()->today())
                ->count(),
            'hiraganaProgress' => $user->hurufs()->wherePivot('is_learned', true)->where('jenis_huruf', 'hiragana')->count(),
            'katakanaProgress' => $user->hurufs()->wherePivot('is_learned', true)->where('jenis_huruf', 'katakana')->count(),
            'maxHiragana' => Huruf::where('jenis_huruf', 'hiragana')->count(),
            'maxKatakana' => Huruf::where('jenis_huruf', 'katakana')->count(),
        ];
    }

    private function getKosakataStats($user)
    {
        return [
            'jumlahKosakata' => $user->kosakatas()->wherePivot('is_learned', true)->count(),
            'jumlahKosakataHariIni' => $user
                ->kosakatas()
                ->wherePivot('is_learned', true)
                ->whereDate('last_completed_at', now()->today())
                ->count(),
            'maxKosakata' => Kosakata::count(),
            'kosakataFavorit' => $user->kosakatas()->wherePivot('is_favorite', true)->count(),
        ];
    }
    
    public function leaderboard()
    {
        $this->cleanupActiveQuisSession();
        $user = auth()->user();
        
        // Ambil top 10 users berdasarkan exp, jika exp sama maka berdasarkan created_at (yang lebih dulu lebih tinggi rank)
        $topUsers = User::where('peran', '!=', 'admin')
            ->orderBy('exp', 'desc')
            ->orderBy('created_at', 'asc') // Yang lebih dulu buat akun lebih tinggi rank
            ->take(10)
            ->get()
            ->map(function ($topUser, $index) {
                // Hitung badges berdasarkan rank
                $badges = [];
                if ($index < 10) $badges[] = "🔥"; // Top 10
                if ($index < 5) $badges[] = "⚡"; // Top 5
                if ($index < 3) $badges[] = "💎"; // Top 3
                
                // Hitung statistik untuk user
                $vocabularyLearned = $topUser->kosakatas()->wherePivot('is_learned', true)->count();
                $charactersLearned = $topUser->hurufs()->wherePivot('is_learned', true)->count();
                $quizzesCompleted = $topUser->quisHurufSessions()->whereNotNull('ended_at')->count() + 
                                    $topUser->quisKosakataSessions()->whereNotNull('ended_at')->count();
                
                return [
                    'id' => $topUser->id,
                    'nama_pengguna' => $topUser->nama_pengguna,
                    'nama_lengkap' => $topUser->nama_lengkap,
                    'foto' => $topUser->foto,
                    'exp' => $topUser->exp,
                    'rank' => $index + 1,
                    'level' => $topUser->level,
                    'badges' => $badges,
                    'vocabularyLearned' => $vocabularyLearned,
                    'charactersLearned' => $charactersLearned,
                    'quizzesCompleted' => $quizzesCompleted,
                ];
            });
        
        // Cek apakah user saat ini ada di top 10
        $currentUserInTopTen = $topUsers->where('id', $user->id)->first();
        
        // Selalu siapkan data currentUser
        $currentUser = null;
        
        if ($currentUserInTopTen) {
            // Jika user ada di top 10, gunakan data dari topUsers
            $currentUser = $currentUserInTopTen;
        } else {
            // Jika user tidak ada di top 10, hitung rank dan siapkan data
            // Hitung rank user saat ini berdasarkan exp dan created_at
            $userRank = User::where('peran', '!=', 'admin')
                ->where(function($query) use ($user) {
                    $query->where('exp', '>', $user->exp)
                          ->orWhere(function($q) use ($user) {
                              $q->where('exp', '=', $user->exp)
                                ->where('created_at', '<', $user->created_at);
                          });
                })
                ->count() + 1;
            
            // Hitung badges berdasarkan rank
            $badges = [];
            if ($userRank <= 10) $badges[] = "🔥"; // Top 10
            if ($userRank <= 5) $badges[] = "⚡"; // Top 5
            if ($userRank <= 3) $badges[] = "💎"; // Top 3
            
            // Hitung statistik untuk user saat ini
            $vocabularyLearned = $user->kosakatas()->wherePivot('is_learned', true)->count();
            $charactersLearned = $user->hurufs()->wherePivot('is_learned', true)->count();
            $quizzesCompleted = $user->quisHurufSessions()->whereNotNull('ended_at')->count() + 
                                $user->quisKosakataSessions()->whereNotNull('ended_at')->count();
            
            $currentUser = [
                'id' => $user->id,
                'nama_pengguna' => $user->nama_pengguna,
                'nama_lengkap' => $user->nama_lengkap,
                'foto' => $user->foto,
                'exp' => $user->exp,
                'rank' => $userRank,
                'level' => $user->level,
                'badges' => $badges,
                'vocabularyLearned' => $vocabularyLearned,
                'charactersLearned' => $charactersLearned,
                'quizzesCompleted' => $quizzesCompleted,
            ];
        }
        
        // Hitung statistik global
        $totalUsers = User::where('peran', '!=', 'admin')->count();
        $totalExp = User::where('peran', '!=', 'admin')->sum('exp');
        
        $globalStats = [
            'totalUsers' => $totalUsers,
            'totalExp' => $totalExp,
        ];
        
        return Inertia::render('User/Leaderboard', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
            'topUsers' => $topUsers,
            'currentUser' => $currentUser,
            'globalStats' => $globalStats,
        ]);
    }
}
