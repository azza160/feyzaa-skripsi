
<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BerandaController;
use App\Http\Controllers\DashboardAdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HurufController;
use App\Http\Controllers\KosakataController;
use App\Http\Controllers\PenggunaAdminController;
use App\Http\Controllers\AdminHurufController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuisController;
use App\Http\Controllers\QuisKosakataController;
use App\Http\Controllers\UserBelajarController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\URL;
use App\Http\Controllers\KosakataAdminController;
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
Route::get('/', [BerandaController::class, 'Beranda'])->name('beranda');
Route::get('/pengenalan-huruf', [BerandaController::class, 'PengenalanHuruf'])->name('PengenalanHuruf');
Route::get('/pengenalan-quis-huruf', [BerandaController::class, 'PengenalanQuisHuruf'])->name('PengenalanQuisHuruf');
Route::get('/pengenalan-kosakata', [BerandaController::class, 'PengenalanKosakata'])->name('PengenalanKosakata');
Route::get('/pengenalan-quis-kosakata', [BerandaController::class, 'PengenalanQuisKosakata'])->name('PengenalanQuisKosakata');

// Auth routes
Route::middleware(['guest'])->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('loginprocess');
    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('registerprocess');
    Route::get('/auth/google', [AuthController::class, 'redirectToGoogle'])->name('google.login');
    Route::get('/auth/google/callback', [AuthController::class, 'handleGoogleCallback'])->name('google.callback');

    // Email verification route
    Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])
        ->middleware(['signed'])
        ->name('verification.verify');

        // Login Admin
Route::get('/admin/login', function() {
    return Inertia::render('Admin/Login');
})->name('admin.login.form');
Route::post('/admin/login', [AuthController::class, 'adminLogin'])->name('admin.login');
});

// Admin routes
// Route::middleware(['auth', 'role:admin'])->group(function () {
//     Route::get('/admin/dashboard',[DashboardAdminController::class,"Dashboard"])->name('admin.dashboard');

 
// });




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
    
    

    //route quis huruf
    Route::get('/dashboard/pilih-huruf-quis',[QuisController::class,'pilihHurufQuisShow'])->name('pilih-huruf-quis');
    Route::get('/dashboard/pilih-level-quis/{jenis}',[QuisController::class,'pilihLevelQuisShow'])->name('pilih-level-quis');
    Route::get('/dashboard/pilih-list-huruf-quis',[QuisController::class,'pilihListHurufQuis'])->name('pilih-list-huruf-quis');
    Route::post('/dashboard/start-quis',[QuisController::class,'startQuis'])->name('start-quis');
    Route::get('/dashboard/quis/{sessionId}',[QuisController::class,'QuisShow'])->name('quis');
    Route::post('/dashboard/quis/save-answer',[QuisController::class,'saveAnswer'])->name('save-quiz-answer');
    Route::get('/dashboard/review-quis/{sessionId}',[QuisController::class,'ReviewQuisShow'])->name('review-quis');
   
    

    //route quis kosakata
    Route::get('/dashboard/pilih-level-quis-kosakata',[QuisKosakataController::class,'pilihLevelQuisShow'])->name('pilih-level-quis-kosakata');
    Route::get('/dashboard/pilih-list-quis-kosakata',[QuisKosakataController::class,'pilihListQuisKosakata'])->name('pilih-list-quis-kosakata');
    Route::get('/dashboard/quis-kosakata/{sessionId}',[QuisKosakataController::class,'QuisKosakataShow'])->name('quis-kosakata');
    Route::post('/dashboard/kuis-kosakata/start', [QuisKosakataController::class, 'startSession'])->name('start-quis-kosakata');
    // Tambahkan endpoint baru untuk intermediate
    Route::post('/dashboard/kuis-kosakata/intermediate/start', [QuisKosakataController::class, 'startIntermediateSession'])->name('start-quis-kosakata-intermediate');
    Route::post('/dashboard/quis-kosakata/save-answer', [\App\Http\Controllers\QuisKosakataController::class, 'saveAnswer'])->name('save-quis-kosakata-answer');
    Route::post('/dashboard/quis-kosakata/delete-session', [\App\Http\Controllers\QuisKosakataController::class, 'deleteSession'])->name('delete-quis-kosakata-session');
    Route::get('/dashboard/review-quis-kosakata/{sessionId}', [\App\Http\Controllers\QuisKosakataController::class, 'ReviewQuisKosakataShow'])->name('review-quis-kosakata');
    Route::get('/dashboard/quis-kosakata-intermediate/{sessionId}', [QuisKosakataController::class, 'QuisKosakataIntermediateShow'])->name('quis-kosakata-intermediate');
    Route::get('/dashboard/review-quis-kosakata-intermediate/{sessionId}', [QuisKosakataController::class, 'ReviewQuisKosakataIntermediateShow'])->name('review-quis-kosakata-intermediate');
    Route::post('/dashboard/kuis-kosakata/advanced/start', [QuisKosakataController::class, 'startAdvancedSession'])->name('start-quis-kosakata-advanced');
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
    
    // Leaderboard route
    Route::get('/dashboard/leaderboard', [DashboardController::class, 'leaderboard'])->name('leaderboard');
    
    // Profile routes
    Route::get('/dashboard/profile', [ProfileController::class, 'showProfile'])->name('profile');
    Route::get('/dashboard/profile/edit', [ProfileController::class, 'showEditProfile'])->name('profile.edit');
    Route::post('/dashboard/profile/update', [ProfileController::class, 'updateProfile'])->name('profile.update');
    
    Route::get('/admin/dashboard',[DashboardAdminController::class,"Dashboard"])->name('admin.dashboard');

//admin users
Route::get('/admin/users',[PenggunaAdminController::class,"index"])->name('admin.pengguna');
Route::delete('/admin/pengguna/{id}', [PenggunaAdminController::class, 'destroy'])->name('admin.pengguna.destroy');

//admin huruf
Route::get('/admin/letters',[AdminHurufController::class,"index"])->name('admin.huruf');
Route::post('/admin/letters', [AdminHurufController::class, 'store'])->name('admin.huruf.store');
Route::put('/admin/letters/{id}', [AdminHurufController::class, 'update'])->name('admin.huruf.update');
Route::delete('/admin/letters/{id}', [AdminHurufController::class, 'destroy'])->name('admin.huruf.destroy');

//admin contoh penggunaan
Route::get('/admin/letter-examples',[AdminHurufController::class,"indexContohPenggunaan"])->name('admin.contoh-penggunaan');
 Route::post('/contoh-penggunaan', [AdminHurufController::class, 'storeContohPenggunaan'])->name('admin.contoh-penggunaan.store');
    Route::put('/contoh-penggunaan/{id}', [AdminHurufController::class, 'updateContohPenggunaan'])->name('admin.contoh-penggunaan.update');
    Route::delete('/contoh-penggunaan/{id}', [AdminHurufController::class, 'destroyContohPenggunaan'])->name('admin.contoh-penggunaan.destroy');

//admin gambar huruf
Route::get('/admin/letter-images',[AdminHurufController::class,"indexGambarHuruf"])->name('admin.gambar-huruf');
Route::post('/admin/letter-images', [AdminHurufController::class, 'storeGambarHuruf'])->name('admin.gambar-huruf.store');
Route::put('/admin/letter-images/{id}', [AdminHurufController::class, 'updateGambarHuruf'])->name('admin.gambar-huruf.update');
Route::delete('/admin/letter-images/{id}', [AdminHurufController::class, 'destroyGambarHuruf'])->name('admin.gambar-huruf.destroy');

//admin kosakata
Route::get('/admin/vocabulary',[KosakataAdminController::class,"index"])->name('admin.kosakata');
Route::post('/admin/vocabulary', [KosakataAdminController::class, 'store'])->name('admin.kosakata.store');
Route::put('/admin/vocabulary/{id}', [KosakataAdminController::class, 'update'])->name('admin.kosakata.update');
Route::delete('/admin/vocabulary/{id}', [KosakataAdminController::class, 'destroy'])->name('admin.kosakata.destroy');

//admin bentuk kosakata
Route::get('/admin/vocabulary-forms',[KosakataAdminController::class,"indexBentukKosakata"])->name('admin.bentuk-kosakata');
Route::post('/admin/vocabulary-forms', [KosakataAdminController::class, 'storeBentukKosakata'])->name('admin.bentuk-kosakata.store');
Route::put('/admin/vocabulary-forms/{id}', [KosakataAdminController::class, 'updateBentukKosakata'])->name('admin.bentuk-kosakata.update');
Route::delete('/admin/vocabulary-forms/{id}', [KosakataAdminController::class, 'destroyBentukKosakata'])->name('admin.bentuk-kosakata.destroy');

// contoh kalimat
Route::get('/admin/example-sentences',[KosakataAdminController::class,"indexContohKalimat"])->name('admin.contoh-kalimat');
Route::post('/admin/example-sentences', [KosakataAdminController::class, 'storeContohKalimat'])->name('admin.contoh-kalimat.store');
Route::put('/admin/example-sentences/{id}', [KosakataAdminController::class, 'updateContohKalimat'])->name('admin.contoh-kalimat.update');
Route::delete('/admin/example-sentences/{id}', [KosakataAdminController::class, 'destroyContohKalimat'])->name('admin.contoh-kalimat.destroy');

//admin soal huruf
Route::get('/admin/letter-quiz',[AdminHurufController::class,"indexSoalHuruf"])->name('admin.soal-huruf');
Route::post('/admin/letter-quiz', [AdminHurufController::class, 'storeSoalHuruf'])->name('admin.soal-huruf.store');
Route::put('/admin/letter-quiz/{id}', [AdminHurufController::class, 'updateSoalHuruf'])->name('admin.soal-huruf.update');
Route::delete('/admin/letter-quiz/{id}', [AdminHurufController::class, 'destroySoalHuruf'])->name('admin.soal-huruf.destroy');

//admin soal Kosakata
Route::get('/admin/vocabulary-quiz', [KosakataAdminController::class, 'indexSoalKosakata'])->name('admin.soal-kosakata');
Route::post('/admin/vocabulary-quiz', [KosakataAdminController::class, 'storeSoalKosakata'])->name('admin.kuis-kosakata.store');
Route::put('/admin/vocabulary-quiz/{id}', [KosakataAdminController::class, 'updateSoalKosakata'])->name('admin.kuis-kosakata.update');
Route::delete('/admin/vocabulary-quiz/{id}', [KosakataAdminController::class, 'destroySoalKosakata'])->name('admin.kuis-kosakata.destroy');
 
    

});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');




