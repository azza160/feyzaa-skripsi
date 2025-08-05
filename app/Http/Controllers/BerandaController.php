<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class BerandaController extends Controller
{
    public function Beranda(){
        // Ambil 5 user dengan exp terbanyak, jika exp sama maka yang lebih dulu buat akun di atas
        $topUsers = User::orderBy('exp', 'desc')
            ->orderBy('created_at', 'asc')
            ->take(5)
            ->get(['id', 'nama_pengguna', 'exp', 'level', 'created_at']);

        return Inertia::render('User/Beranda', [
            'topUsers' => $topUsers,
            'url' => '/'
        ]);
    }

    public function PengenalanHuruf(){

        return Inertia::render('User/PengenalanHuruf',[
            'url' => '/pengenalan-huruf'
        ]);
    }

}
