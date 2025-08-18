<?php

namespace App\Http\Controllers;

use App\Models\Huruf;
use App\Models\Kosakata;
use App\Models\SoalKosakata;
use App\Models\SoalQuisHuruf;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardAdminController extends Controller
{
    public function Dashboard()
{
    $dashboardStats = [
        [
            'title' => 'Total Pengguna',
            'value' => number_format(User::count()),
            'icon' => 'Users', // kita kirim string nama ikon, nanti di React mapping ke komponen
            'color' => 'text-blue-600',
            'bgColor' => 'bg-blue-100',
        ],
        [
            'title' => 'Total Huruf',
            'value' => number_format(Huruf::count()),
            'icon' => 'FileText',
            'color' => 'text-green-600',
            'bgColor' => 'bg-green-100',
        ],
        [
            'title' => 'Total Kosakata',
            'value' => number_format(Kosakata::count()),
            'icon' => 'BookOpen',
            'color' => 'text-purple-600',
            'bgColor' => 'bg-purple-100',
        ],
        [
            'title' => 'Total Soal Kuis Huruf',
            'value' => number_format(SoalQuisHuruf::count()),
            'icon' => 'HelpCircle',
            'color' => 'text-orange-600',
            'bgColor' => 'bg-orange-100',
        ],
        [
            'title' => 'Total Soal Kuis Kosakata',
            'value' => number_format(SoalKosakata::count()),
            'icon' => 'HelpCircle',
            'color' => 'text-red-600',
            'bgColor' => 'bg-red-100',
        ],
    ];

   

    return Inertia::render('Admin/DashboardAdmin', [
        'dashboardStats' => $dashboardStats,
    ]);
}
}
