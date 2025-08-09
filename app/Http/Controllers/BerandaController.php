<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class BerandaController extends Controller
{
    public function Beranda(){
        // Ambil 5 user dengan exp terbanyak, jika exp sama maka yang lebih dulu buat akun di atas
        $topUsers = User::orderBy('exp', 'desc')
            ->where('peran','pengguna')
            ->orderBy('created_at', 'asc')
            ->take(5)
            ->get(['id', 'nama_pengguna', 'exp', 'level', 'created_at', 'foto']);

            //check if user is logged in
            $isLoggedIn = Auth::check();
            

        return Inertia::render('User/Beranda', [
            'topUsers' => $topUsers,
            'isLogin' => $isLoggedIn,
            'url' => '/'
        ]);
    }

    public function PengenalanHuruf(){
        $isLoggedIn = Auth::check();
        return Inertia::render('User/PengenalanHuruf',[
            //check if user is logged in
           
            'url' => '/pengenalan-huruf',
            'isLogin' => $isLoggedIn,
        ]);
    }

    public function PengenalanQuisHuruf(){
        $isLoggedIn = Auth::check();
        return Inertia::render('User/PengenalanQuisHuruf',[
            'url' => '/pengenalan-quis-huruf',
            'isLogin' => $isLoggedIn,
        ]);
    }

    public function PengenalanKosakata(){
        $isLoggedIn = Auth::check();
        return Inertia::render('User/PengenalanKosakata',[
            'url' => '/pengenalan-kosakata',
            'isLogin' => $isLoggedIn,
        ]);
    }

    public function PengenalanQuisKosakata(){
        $isLoggedIn = Auth::check();
        return Inertia::render('User/PengenalanQuisKosakata',[
            'url' => '/pengenalan-quis-kosakata',
            'isLogin' => $isLoggedIn,
        ]);
    }

}
