<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class PenggunaAdminController extends Controller
{
      public function index(){
        $users = User::where('peran', 'pengguna')
            ->select('id', 'nama_pengguna', 'email', 'password', 'google_id', 'exp', 'level', 'created_at')
            ->get()
            ->map(function($user) {
                return [
                    'id' => $user->id,
                    'nama_pengguna' => $user->nama_pengguna,
                    'email' => $user->email,
                    'password' => '********', // Jangan kirim password asli!
                    'google_id' => $user->google_id,
                    'exp' => $user->exp,
                    'level' => $user->level,
                    'created_at' => $user->created_at->format('Y-m-d'),
                ];
            });

        return Inertia::render('Admin/Pengguna', [
            'users' => $users,
        ]);
    }

    
    public function destroy($id)
    {
        $user = User::where('peran', 'pengguna')->findOrFail($id);
        $user->delete();

        return redirect()->back()->with('success', 'Pengguna berhasil dihapus.');
    }

}
