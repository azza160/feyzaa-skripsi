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
    
        \Log::info('Profile update request:', [
            'has_file' => $request->hasFile('avatar'),
            'file_name' => $request->file('avatar')?->getClientOriginalName(),
            'file_size' => $request->file('avatar')?->getSize(),
            'name' => $request->name,
            'full_name' => $request->full_name,
            'all_data' => $request->all(),
            'files' => $request->allFiles(),
            'content_type' => $request->header('Content-Type'),
            'method' => $request->method(),
            'url' => $request->url(),
        ]);
    
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'full_name' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        if ($validator->fails()) {
            \Log::error('Validation failed:', $validator->errors()->toArray());
            return back()->withErrors($validator)->withInput();
        }
    
        try {
            // Update basic fields
            $user->nama_pengguna = $request->name;
            $user->nama_lengkap = $request->full_name;
    
            // Handle avatar upload
            if ($request->hasFile('avatar')) {
                $file = $request->file('avatar');
    
                \Log::info('Processing avatar upload:', [
                    'original_name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                    'is_valid' => $file->isValid(),
                    'error' => $file->getError(),
                ]);
    
                if (!$file->isValid()) {
                    \Log::error('File upload invalid', ['error' => $file->getError()]);
                    return back()->withErrors(['avatar' => 'File upload gagal.'])->withInput();
                }
    
                // Hapus avatar lama (jika ada dan bukan URL eksternal)
                if ($user->foto && !preg_match('/^https?:\/\//', $user->foto)) {
                    // user->foto biasanya '/storage/avatars/xxx.jpg' => kita ubah ke 'avatars/xxx.jpg'
                    $oldPath = preg_replace('#^/storage/#', '', $user->foto);
    
                    if ($oldPath && Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                        \Log::info('Deleted old avatar:', ['path' => $oldPath]);
                    }
                }
    
                // Simpan file langsung ke disk "public" (yang root-nya adalah public/storage)
                // Akan menyimpan ke public/storage/avatars/xxxx.jpg
                $storedPath = $file->store('avatars', 'public'); // returns "avatars/xxxx.jpg"
    
                // Simpan URL relatif ke DB: /storage/avatars/xxxx.jpg
                $user->foto = '/storage/' . ltrim($storedPath, '/');
    
                \Log::info('Avatar uploaded successfully:', [
                    'stored_path' => $storedPath,
                    'public_url' => $user->foto,
                ]);
            } else {
                \Log::info('No avatar file uploaded');
            }
    
            $user->save();
    
            \Log::info('Profile updated successfully for user:', ['user_id' => $user->id]);
    
            return redirect()->route('profile')->with([
                'success' => true,
                'message' => 'Profil berhasil diperbarui!'
            ]);
        } catch (\Exception $e) {
            \Log::error('Profile update failed:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui profil.'])->withInput();
        }
    }
    


} 