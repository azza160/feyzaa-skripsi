<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HurufController;
use App\Http\Controllers\KosakataController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuisController;
use App\Http\Controllers\QuisKosakataController;
use App\Http\Controllers\UserBelajarController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\URL;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
   return Inertia::render('Welcome');
});

// Auth routes
Route::middleware(['guest'])->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register');
    Route::get('/auth/google', [AuthController::class, 'redirectToGoogle'])->name('google.login');
    Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback'])->name('google.callback');

    // Email verification route
    Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
        ->middleware(['signed'])
        ->name('verification.verify');
});

// Admin routes
Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');
});

// User routes
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard',[DashboardController::class,"dashboardUser"])->name('dashboard');

    Route::get('/dashboard/huruf', [HurufController::class,"pilihHuruf"])->name('huruf');

    Route::get('/dashboard/huruf/kategori-hiragana', [HurufController::class,"kategoriHiragana"])->name('kategori-huruf-hiragana');

    Route::get('/dashboard/huruf/kategori-katakana',[HurufController::class,"kategoriKatakana"])->name('kategori-huruf-katakana');
    
    Route::get('/dashboard/huruf/{jenis}/{kategori}',[HurufController::class,'GetHurufByKategori'])->name('huruf-list');
    Route::get('/dashboard/huruf/{jenis}/{kategori}/{id}', [HurufController::class, 'showDetailHuruf'])->name('huruf-hiragana-detail');

    //kosakata quis
    Route::get('/dashboard/kosakata',[KosakataController::class,'getAllKosakata'])->name('list-kosakata');
    Route::get('/dashboard/kosakata/detail-kosakata/{id}', [KosakataController::class,"getDetailKosakata"])->name('detail-kosakata');
    
    Route::get('/dashboard/flashcard', [KosakataController::class,'flashcard'])->name('flashcard');

    //route quis huruf
    Route::get('/dashboard/pilih-huruf-quis',[QuisController::class,'pilihHurufQuisShow'])->name('pilih-huruf-quis');
    Route::get('/dashboard/pilih-level-quis/{jenis}',[QuisController::class,'pilihLevelQuisShow'])->name('pilih-level-quis');
    Route::get('/dashboard/pilih-list-huruf-quis',[QuisController::class,'pilihListHurufQuis'])->name('pilih-list-huruf-quis');
    Route::post('/dashboard/start-quis',[QuisController::class,'startQuis'])->name('start-quis')->middleware('quiz.rate.limit');
    Route::get('/dashboard/quis/{sessionId}',[QuisController::class,'QuisShow'])->name('quis');
    Route::post('/dashboard/quis/save-answer',[QuisController::class,'saveAnswer'])->name('save-quiz-answer');
    Route::get('/dashboard/review-quis/{sessionId}',[QuisController::class,'ReviewQuisShow'])->name('review-quis');
   
    

    //route quis kosakata
    Route::get('/dashboard/pilih-level-quis-kosakata',[QuisKosakataController::class,'pilihLevelQuisShow'])->name('pilih-level-quis-kosakata');
    Route::get('/dashboard/pilih-list-quis-kosakata',[QuisKosakataController::class,'pilihListQuisKosakata'])->name('pilih-list-quis-kosakata');
    Route::get('/dashboard/quis-kosakata/{sessionId}',[QuisKosakataController::class,'QuisKosakataShow'])->name('quis-kosakata');
    Route::post('/dashboard/kuis-kosakata/start', [QuisKosakataController::class, 'startSession'])->name('start-quis-kosakata')->middleware('quiz.rate.limit');
    // Tambahkan endpoint baru untuk intermediate
    Route::post('/dashboard/kuis-kosakata/intermediate/start', [QuisKosakataController::class, 'startIntermediateSession'])->name('start-quis-kosakata-intermediate')->middleware('quiz.rate.limit');
    Route::post('/dashboard/quis-kosakata/save-answer', [\App\Http\Controllers\QuisKosakataController::class, 'saveAnswer'])->name('save-quis-kosakata-answer');
    Route::post('/dashboard/quis-kosakata/delete-session', [\App\Http\Controllers\QuisKosakataController::class, 'deleteSession'])->name('delete-quis-kosakata-session');
    Route::get('/dashboard/review-quis-kosakata/{sessionId}', [\App\Http\Controllers\QuisKosakataController::class, 'ReviewQuisKosakataShow'])->name('review-quis-kosakata');
    Route::get('/dashboard/quis-kosakata-intermediate/{sessionId}', [QuisKosakataController::class, 'QuisKosakataIntermediateShow'])->name('quis-kosakata-intermediate');
    Route::get('/dashboard/review-quis-kosakata-intermediate/{sessionId}', [QuisKosakataController::class, 'ReviewQuisKosakataIntermediateShow'])->name('review-quis-kosakata-intermediate');
    Route::post('/dashboard/kuis-kosakata/advanced/start', [QuisKosakataController::class, 'startAdvancedSession'])->name('start-quis-kosakata-advanced')->middleware('quiz.rate.limit');
    Route::get('/dashboard/quis-kosakata-advanced/{sessionId}', [QuisKosakataController::class, 'QuisKosakataAdvancedShow'])->name('quis-kosakata-advanced');
    Route::get('/dashboard/review-quis-kosakata-advanced/{sessionId}', [QuisKosakataController::class, 'ReviewQuisKosakataAdvancedShow'])->name('review-quis-kosakata-advanced');

    // route progress uses
    Route::post('/user/belajar/update', [UserBelajarController::class, 'updateProgress'])->name('user.belajar.update');
    Route::post('/user/belajar/update-huruf', [UserBelajarController::class, 'updateProgressHuruf'])->name('user.belajar.update-huruf');
    Route::get('/user/belajar/check', [UserBelajarController::class, 'checkLearningRecord'])->name('user.belajar.check');
    Route::post('/user/belajar/update-kategori', [UserBelajarController::class, 'updateProgressKategori'])->name('user.belajar.update-kategori');
    Route::post('/user/belajar/check-kategori', [UserBelajarController::class, 'checkKategoriRecord'])->name('user.belajar.check-kategori');
    Route::post('/user/belajar/update-user-huruf', [UserBelajarController::class, 'updateUserHuruf'])->name('user.belajar.update-user-huruf');
    Route::post('/user/belajar/update-user-huruf-paham', [UserBelajarController::class, 'updateUserHurufPaham'])->name('user.belajar.update-user-huruf-paham');
    Route::post('/user/belajar/update-user-kosakata', [UserBelajarController::class, 'updateUserKosakata'])->name('user.belajar.update-user-kosakata');
    Route::post('/user/belajar/update-user-kosakata-favorite', [UserBelajarController::class, 'updateUserKosakataFavorite'])->name('user.belajar.update-user-kosakata-favorite');
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');




