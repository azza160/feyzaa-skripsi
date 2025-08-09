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

        // Debug: Log request data
        \Log::info('Profile update request:', [
            'has_file' => $request->hasFile('avatar'),
            'file_name' => $request->file('avatar')?->getClientOriginalName(),
            'file_size' => $request->file('avatar')?->getSize(),
            'name' => $request->name,
            'full_name' => $request->full_name,
            'all_data' => $request->all(),
            'files' => $request->allFiles(),
            'content_type' => $request->header('Content-Type'),
            'content_length' => $request->header('Content-Length'),
            'method' => $request->method(),
            'url' => $request->url(),
        ]);

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'full_name' => 'required|string|max:255',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Max 2MB
        ], [
            'name.required' => 'Nama pengguna harus diisi.',
            'name.string' => 'Nama pengguna harus berupa teks.',
            'name.max' => 'Nama pengguna maksimal 255 karakter.',
            'full_name.required' => 'Nama lengkap harus diisi.',
            'full_name.string' => 'Nama lengkap harus berupa teks.',
            'full_name.max' => 'Nama lengkap maksimal 255 karakter.',
            'avatar.image' => 'File harus berupa gambar.',
            'avatar.mimes' => 'Format gambar harus jpeg, png, jpg, atau gif.',
            'avatar.max' => 'Ukuran gambar maksimal 2MB.',
        ]);

        // Debug: Log validation data
        \Log::info('Validation data:', [
            'request_all' => $request->all(),
            'request_files' => $request->allFiles(),
            'has_avatar' => $request->hasFile('avatar'),
        ]);

        if ($validator->fails()) {
            \Log::error('Validation failed:', $validator->errors()->toArray());
            return back()->withErrors($validator)->withInput();
        }

        try {
            // Update user data
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
                
                // Check if file is valid
                if (!$file->isValid()) {
                    \Log::error('File upload error:', ['error' => $file->getError()]);
                    return back()->withErrors(['avatar' => 'File upload gagal. Silakan coba lagi.'])->withInput();
                }
                
                // Check file size (2MB = 2 * 1024 * 1024 bytes)
                if ($file->getSize() > 2 * 1024 * 1024) {
                    \Log::warning('File too large:', ['size' => $file->getSize()]);
                    return back()->withErrors(['avatar' => 'Ukuran gambar maksimal 2MB.'])->withInput();
                }

                if ($user->foto && !preg_match('/^https?:\/\//', $user->foto)) {
                    $oldPath = str_replace('/storage/', '', $user->foto);
                
                    if (Storage::disk('public')->exists($oldPath)) {
                        Storage::disk('public')->delete($oldPath);
                        \Log::info('Deleted old avatar:', ['path' => $oldPath]);
                    }
                }

                // Store new avatar
                $path = $file->store('avatars', 'public');
                $user->foto = Storage::url($path); // Simpan langsung path URL publik (/storage/avatars/namafile.jpg)

                
                \Log::info('Avatar uploaded successfully:', [
                    'new_path' => $path,
                    'full_path' => Storage::disk('public')->url($path)
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
            return back()->withErrors(['error' => 'Terjadi kesalahan saat memperbarui profil. Silakan coba lagi.'])->withInput();
        }
    }


} 