<?php

namespace App\Http\Controllers;

use App\Models\Contoh_Penggunaan;
use App\Models\Huruf;
use App\Models\Gambar_Huruf;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class AdminHurufController extends Controller
{
    public function storeSoalHuruf(Request $request)
    {
        $data = $request->validate([
            'huruf_id' => 'required|string|exists:hurufs,id',
            'jenis' => 'required|in:hiragana,katakana',
            'level' => 'required|in:beginner,intermediate,advanced',
            'question' => 'required|string',
            'character' => 'required|string',
            'correct_answer' => 'required|in:a,b,c,d',
            'option_a' => 'required|string',
            'option_b' => 'required|string',
            'option_c' => 'required|string',
            'option_d' => 'required|string',
        ]);
        \App\Models\SoalQuisHuruf::create($data);
        return redirect()->back()->with('success', 'Soal kuis huruf berhasil ditambahkan.');
    }

    public function updateSoalHuruf(Request $request, $id)
    {
        $data = $request->validate([
            // huruf_id tidak bisa diubah saat edit
            'jenis' => 'required|in:hiragana,katakana',
            'level' => 'required|in:beginner,intermediate,advanced',
            'question' => 'required|string',
            'character' => 'required|string',
            'correct_answer' => 'required|in:a,b,c,d',
            'option_a' => 'required|string',
            'option_b' => 'required|string',
            'option_c' => 'required|string',
            'option_d' => 'required|string',
        ]);
        $soal = \App\Models\SoalQuisHuruf::findOrFail($id);
        $soal->update($data);
        return redirect()->back()->with('success', 'Soal kuis huruf berhasil diupdate.');
    }

    public function destroySoalHuruf($id)
    {
        $soal = \App\Models\SoalQuisHuruf::findOrFail($id);
        $soal->delete();
        return redirect()->back()->with('success', 'Soal kuis huruf berhasil dihapus.');
    }
    public function index()
    {
        $hurufs = Huruf::withCount(['contohPenggunaans', 'gambarHurufs'])
            ->orderBy('created_at', 'desc') // urutkan terbaru dulu
            ->get()
            ->map(function ($huruf) {
                return [
                    'id' => $huruf->id,
                    'huruf' => $huruf->huruf,
                    'jenis_huruf' => $huruf->jenis_huruf,
                    'kategori_huruf' => $huruf->kategori_huruf,
                    'deskripsi' => $huruf->deskripsi,
                    'romaji' => $huruf->romaji,
                    'urutan' => $huruf->urutan,
                    'jumlah_coretan' => $huruf->jumlah_coretan,
                    'kategori' => $huruf->kategori,
                    'groups' => $huruf->groups,
                    'catatan' => $huruf->catatan,
                    'audio' => $huruf->audio,

                    // tambahan biar sesuai dengan struktur static
                    'contoh_penggunaans' => $huruf->contoh_penggunaans_count,
                    'gambar_huruf' => $huruf->gambar_hurufs_count,
                ];
            });

           

        return Inertia::render('Admin/HurufAdmin', [
            'letters' => $hurufs
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'huruf' => 'required|string',
            'jenis_huruf' => 'required|string',
            'kategori_huruf' => 'required|string',
            'deskripsi' => 'nullable|string',
            'romaji' => 'required|string',
            'urutan' => 'nullable|integer',
            'jumlah_coretan' => 'nullable|integer',
            'kategori' => 'nullable|string',
            'groups' => 'nullable|string',
            'catatan' => 'nullable|string',
            'audio' => 'nullable|string',
        ]);
        $data['id'] = Str::uuid()->toString();
        $huruf = \App\Models\Huruf::create($data);
        return redirect()->back()->with('success', 'Huruf berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'huruf' => 'required|string',
            'jenis_huruf' => 'required|string',
            'kategori_huruf' => 'required|string',
            'deskripsi' => 'nullable|string',
            'romaji' => 'required|string',
            'urutan' => 'nullable|integer',
            'jumlah_coretan' => 'nullable|integer',
            'kategori' => 'nullable|string',
            'groups' => 'nullable|string',
            'catatan' => 'nullable|string',
            'audio' => 'nullable|string',
        ]);
        $huruf = \App\Models\Huruf::findOrFail($id);
        $huruf->update($data);
        return redirect()->back()->with('success', 'Huruf berhasil diupdate.');
    }

    public function destroy($id)
    {
        $huruf = \App\Models\Huruf::findOrFail($id);
        $huruf->delete();
        return redirect()->back()->with('success', 'Huruf berhasil dihapus.');
    }

    public function indexContohPenggunaan()
    {
        $examples = Contoh_Penggunaan::with('huruf')
            ->orderBy('created_at', 'desc') // urutkan terbaru dulu
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'kata' => $item->kata,
                    'romaji' => $item->romaji,
                    'arti' => $item->arti,
                    'huruf_id' => $item->huruf_id,
                    'audio' => $item->audio,
                ];
            });

        $availableLetters = Huruf::select('id', 'huruf', 'romaji')->get()->map(function ($huruf) {
            return [
                'id' => $huruf->id,
                'huruf' => $huruf->huruf,
                'romaji' => $huruf->romaji,
            ];
        });

        return Inertia::render('Admin/ContohPenggunaanAdmin', [
            'examples' => $examples,
            'availableLetters' => $availableLetters,
        ]);
    }

    public function storeContohPenggunaan(Request $request)
{
    $data = $request->validate([
        'kata' => 'required|string',
        'romaji' => 'required|string',
        'arti' => 'required|string',
        'huruf_id' => 'required|string|exists:hurufs,id',
        'audio' => 'nullable|string',
    ]);
    Contoh_Penggunaan::create($data);
    return redirect()->back()->with('success', 'Contoh penggunaan berhasil ditambahkan.');
}

public function updateContohPenggunaan(Request $request, $id)
{
    $data = $request->validate([
        'kata' => 'required|string',
        'romaji' => 'required|string',
        'arti' => 'required|string',
        'huruf_id' => 'required|string|exists:hurufs,id',
        'audio' => 'nullable|string',
    ]);
    $contoh = Contoh_Penggunaan::findOrFail($id);
    // Pastikan huruf_id tidak diubah saat edit
    unset($data['huruf_id']);
    $contoh->update($data);
    return redirect()->back()->with('success', 'Contoh penggunaan berhasil diupdate.');
}

public function destroyContohPenggunaan($id)
{
    $contoh = Contoh_Penggunaan::findOrFail($id);
    $contoh->delete();
    return redirect()->back()->with('success', 'Contoh penggunaan berhasil dihapus.');
}


public function indexGambarHuruf()
{
    // Ambil gambar huruf beserta huruf terkait
    $images = Gambar_Huruf::with('huruf')->orderBy('created_at', 'desc')->get()->map(function ($img) {
        return [
            'id' => $img->id,
            'link' => $img->link,
            'urutan' => $img->urutan,
            'huruf_id' => $img->huruf_id,
        ];
    });

    // Ambil semua huruf untuk dropdown
    $availableLetters = Huruf::select('id', 'huruf', 'romaji')->get()->map(function ($huruf) {
        return [
            'id' => $huruf->id,
            'huruf' => $huruf->huruf,
            'romaji' => $huruf->romaji,
        ];
    });

    return Inertia::render('Admin/GambarHurufAdmin', [
        'images' => $images,
        'availableLetters' => $availableLetters,]);

} 

public function storeGambarHuruf(Request $request)
{
    $data = $request->validate([
        'link' => 'required|string',
        'urutan' => 'required|integer',
        'huruf_id' => 'required|string|exists:hurufs,id',
    ]);
    \App\Models\Gambar_Huruf::create($data);
    return redirect()->back()->with('success', 'Gambar huruf berhasil ditambahkan.');
}

public function updateGambarHuruf(Request $request, $id)
{
    $data = $request->validate([
        'link' => 'required|string',
        'urutan' => 'required|integer',
        // huruf_id tidak perlu divalidasi/diubah saat edit
    ]);
    $gambar = \App\Models\Gambar_Huruf::findOrFail($id);
    $gambar->update($data);
    return redirect()->back()->with('success', 'Gambar huruf berhasil diupdate.');
}

public function destroyGambarHuruf($id)
{
    $gambar = \App\Models\Gambar_Huruf::findOrFail($id);
    $gambar->delete();
    return redirect()->back()->with('success', 'Gambar huruf berhasil dihapus.');

}

public function indexSoalHuruf(){
    // Ambil semua soal quis huruf beserta relasi huruf
    $quizzes = \App\Models\SoalQuisHuruf::with('huruf')
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($quiz) {
            return [
                'id' => $quiz->id,
                'huruf_id' => $quiz->huruf_id,
                'jenis' => $quiz->jenis,
                'level' => $quiz->level,
                'question' => $quiz->question,
                'character' => $quiz->character,
                'correct_answer' => $quiz->correct_answer,
                'option_a' => $quiz->option_a,
                'option_b' => $quiz->option_b,
                'option_c' => $quiz->option_c,
                'option_d' => $quiz->option_d,
            ];
        });

    // Ambil semua huruf untuk dropdown
    $availableLetters = Huruf::select('id', 'huruf', 'romaji')->get()->map(function ($huruf) {
        return [
            'id' => $huruf->id,
            'huruf' => $huruf->huruf,
            'romaji' => $huruf->romaji,
        ];
    });

    return Inertia::render('Admin/KuisHurufAdmin', [
        'letterQuizzes' => $quizzes,
        'availableLetters' => $availableLetters,
    ]);
}

}
