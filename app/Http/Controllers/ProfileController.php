<?php

namespace App\Http\Controllers;

use App\Models\Huruf;
use App\Models\Kosakata;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;

class ProfileController extends Controller
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

    private function getHurufStats($user)
    {
        return [
            'letters_learned' => $user->hurufs()->wherePivot('is_learned', true)->count(),
            'hiraganaProgress' => $user->hurufs()->wherePivot('is_learned', true)->where('jenis_huruf', 'hiragana')->count(),
            'katakanaProgress' => $user->hurufs()->wherePivot('is_learned', true)->where('jenis_huruf', 'katakana')->count(),
            'maxHiragana' => Huruf::where('jenis_huruf', 'hiragana')->count(),
            'maxKatakana' => Huruf::where('jenis_huruf', 'katakana')->count(),
        ];
    }

    private function getKosakataStats($user)
    {
        return [
            'vocabulary_learned' => $user->kosakatas()->wherePivot('is_learned', true)->count(),
            'maxKosakata' => Kosakata::count(),
            'kosakataFavorit' => $user->kosakatas()->wherePivot('is_favorite', true)->count(),
        ];
    }

    public function showProfile()
    {
        $this->cleanupActiveQuisSession();
        $user = auth()->user();

        $hurufStats = $this->getHurufStats($user);
        $kosakataStats = $this->getKosakataStats($user);

        // Hitung total quiz yang sudah selesai
        $quizzesCompleted = $user->quisHurufSessions()->whereNotNull('ended_at')->count() + 
                           $user->quisKosakataSessions()->whereNotNull('ended_at')->count();

        // Gabungkan semua stats
        $stats = [
            'exp' => $user->exp,
            'level' => $user->level,
            'letters_learned' => $hurufStats['letters_learned'],
            'vocabulary_learned' => $kosakataStats['vocabulary_learned'],
            'quizzes_completed' => $quizzesCompleted,
        ];

        return Inertia::render('User/Profile', [
            'user' => $user,
            'stats' => $stats,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
        ]);
    }

    public function showEditProfile()
    {
        $this->cleanupActiveQuisSession();
        $user = auth()->user();

        return Inertia::render('User/Edit-Profile', [
            'user' => $user,
            'currentLevel' => $user->level,
            'currentExp' => $user->exp,
            'maxExp' => $this->calculateNextLevelExp($user->level),
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = auth()->user();
    
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'full_name' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }
    
        $user->nama_pengguna = $request->name;
        $user->nama_lengkap = $request->full_name;
    
        if ($request->hasFile('avatar')) {
            $file = $request->file('avatar');
    
            // Hapus foto lama kalau ada
            if ($user->foto) {
                $oldFilePath = public_path(str_replace('/public/', '', $user->foto));
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
            }
    
            // Simpan ke public/avatars
            $filename = uniqid() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('avatars'), $filename);
    
            // Simpan path relatif dengan prefix /public/avatars
            $user->foto = '/public/avatars/' . $filename;
        }
    
        $user->save();
    
        return redirect()->route('profile')->with([
            'success' => true,
            'message' => 'Profil berhasil diperbarui!'
        ]);
    }
    
    
    


} 