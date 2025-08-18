<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Kosakata;
use App\Models\BentukKosakata;
use App\Models\ContohKalimat;
use Illuminate\Support\Str;
use function App\Helpers\route;

class KosakataAdminController extends Controller

{

    // CRUD SoalKosakata
    public function storeSoalKosakata(Request $request)
    {
        $data = $request->validate([
            'kosakata_id' => 'required|string|exists:kosakatas,id',
            'level' => 'required|in:intermediate,advanced',
            'soal_kanji' => 'required|string',
            'soal_furigana' => 'required|string',
            'soal_romaji' => 'required|string',
            'soal_arti' => 'required|string',
            'opsi_a_kanji' => 'required|string',
            'opsi_a_furigana' => 'required|string',
            'opsi_a_romaji' => 'required|string',
            'opsi_a_arti' => 'required|string',
            'opsi_b_kanji' => 'required|string',
            'opsi_b_furigana' => 'required|string',
            'opsi_b_romaji' => 'required|string',
            'opsi_b_arti' => 'required|string',
            'opsi_c_kanji' => 'required|string',
            'opsi_c_furigana' => 'required|string',
            'opsi_c_romaji' => 'required|string',
            'opsi_c_arti' => 'required|string',
            'opsi_d_kanji' => 'required|string',
            'opsi_d_furigana' => 'required|string',
            'opsi_d_romaji' => 'required|string',
            'opsi_d_arti' => 'required|string',
            'jawaban_benar' => 'required|in:a,b,c,d',
        ]);
        $data['id'] = \Illuminate\Support\Str::uuid()->toString();
        \App\Models\SoalKosakata::create($data);
        return redirect()->back()->with('success', 'Soal kosakata berhasil ditambahkan.');
    }

    public function updateSoalKosakata(Request $request, $id)
    {
        $data = $request->validate([
            // kosakata_id tidak perlu diubah saat edit
            'level' => 'required|in:intermediate,advanced',
            'soal_kanji' => 'required|string',
            'soal_furigana' => 'required|string',
            'soal_romaji' => 'required|string',
            'soal_arti' => 'required|string',
            'opsi_a_kanji' => 'required|string',
            'opsi_a_furigana' => 'required|string',
            'opsi_a_romaji' => 'required|string',
            'opsi_a_arti' => 'required|string',
            'opsi_b_kanji' => 'required|string',
            'opsi_b_furigana' => 'required|string',
            'opsi_b_romaji' => 'required|string',
            'opsi_b_arti' => 'required|string',
            'opsi_c_kanji' => 'required|string',
            'opsi_c_furigana' => 'required|string',
            'opsi_c_romaji' => 'required|string',
            'opsi_c_arti' => 'required|string',
            'opsi_d_kanji' => 'required|string',
            'opsi_d_furigana' => 'required|string',
            'opsi_d_romaji' => 'required|string',
            'opsi_d_arti' => 'required|string',
            'jawaban_benar' => 'required|in:a,b,c,d',
        ]);
        $soal = \App\Models\SoalKosakata::findOrFail($id);
        $soal->update($data);
        return redirect()->back()->with('success', 'Soal kosakata berhasil diupdate.');
    }

    public function destroySoalKosakata($id)
    {
        $soal = \App\Models\SoalKosakata::findOrFail($id);
        $soal->delete();
        return redirect()->back()->with('success', 'Soal kosakata berhasil dihapus.');
    }
    public function index()
    {
        $vocabularies = Kosakata::withCount(['contohKalimats', 'bentukKosakatas'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'kanji' => $item->kanji,
                    'furigana' => $item->furigana,
                    'romaji' => $item->romaji,
                    'arti' => $item->arti,
                    'deskripsi' => $item->deskripsi,
                    'catatan' => $item->catatan,
                    'audio' => $item->audio,
                    'total_contoh_kalimat' => $item->contoh_kalimats_count,
                    'total_bentuk_kosakata' => $item->bentuk_kosakatas_count,
                ];
            });

        return Inertia::render('Admin/KosakataAdmin', [
            'vocabularies' => $vocabularies,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'kanji' => 'required|string',
            'furigana' => 'required|string',
            'romaji' => 'required|string',
            'arti' => 'required|string',
            'deskripsi' => 'nullable|string',
            'catatan' => 'nullable|string',
            'audio' => 'nullable|string',
        ]);
        $data['id'] = Str::uuid()->toString();
        \App\Models\Kosakata::create($data);
        return redirect()->back()->with('success', 'Kosakata berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'kanji' => 'required|string',
            'furigana' => 'required|string',
            'romaji' => 'required|string',
            'arti' => 'required|string',
            'deskripsi' => 'nullable|string',
            'catatan' => 'nullable|string',
            'audio' => 'nullable|string',
        ]);
    $kosakata = \App\Models\Kosakata::findOrFail($id);
        $kosakata->update($data);
        return redirect()->back()->with('success', 'Kosakata berhasil diupdate.');
    }

    public function destroy($id)
    {
        $kosakata = \App\Models\Kosakata::findOrFail($id);
        $kosakata->delete();
        return redirect()->back()->with('success', 'Kosakata berhasil dihapus.');
    }

    public function indexBentukKosakata()
    {
        // Ambil semua bentuk kosakata beserta kosakata terkait
        $vocabularyForms = BentukKosakata::with('kosakata')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($form) {
                return [
                    'id' => $form->id,
                    'bentuk' => $form->bentuk,
                    'id_kosakata' => $form->id_kosakata,
                    'kanji' => $form->kanji,
                    'furigana' => $form->furigana,
                    'romaji' => $form->romaji,
                    'arti' => $form->arti,
                    'deskripsi' => $form->deskripsi,
                    'audio' => $form->audio,
                ];
            });

        // Ambil semua kosakata untuk dropdown
        $availableVocabularies = Kosakata::select('id', 'kanji', 'arti')->get()->map(function ($vocab) {
            return [
                'id' => $vocab->id,
                'kanji' => $vocab->kanji,
                'arti' => $vocab->arti,
            ];
        });

        

        return Inertia::render('Admin/BentukKosakataAdmin', [
            'vocabularyForms' => $vocabularyForms,
            'availableVocabularies' => $availableVocabularies,
        ]);
    }

    public function storeBentukKosakata(Request $request)
    {
        $data = $request->validate([
            'bentuk' => 'required|string',
            'id_kosakata' => 'required|string|exists:kosakatas,id',
            'kanji' => 'nullable|string',
            'furigana' => 'nullable|string',
            'romaji' => 'required|string',
            'arti' => 'required|string',
            'deskripsi' => 'nullable|string',
            'audio' => 'nullable|string',
        ]);
        $data['id'] = Str::uuid()->toString();
        BentukKosakata::create($data);
        return redirect()->back()->with('success', 'Bentuk kosakata berhasil ditambahkan.');
    }

    public function updateBentukKosakata(Request $request, $id)
    {
        $data = $request->validate([
            'bentuk' => 'required|string',
            // id_kosakata tidak perlu diubah saat edit
            'kanji' => 'nullable|string',
            'furigana' => 'nullable|string',
            'romaji' => 'required|string',
            'arti' => 'required|string',
            'deskripsi' => 'nullable|string',
            'audio' => 'nullable|string',
        ]);
        $form = BentukKosakata::findOrFail($id);
        $form->update($data);
        return redirect()->back()->with('success', 'Bentuk kosakata berhasil diupdate.');
    }

    public function destroyBentukKosakata($id)
    {
        $form = BentukKosakata::findOrFail($id);
        $form->delete();
        return redirect()->back()->with('success', 'Bentuk kosakata berhasil dihapus.');
    }

    public function indexContohKalimat()
    {
        // Ambil semua contoh kalimat beserta relasi kosakata & bentuk
        $exampleSentences = ContohKalimat::with(['kosakata', 'bentukKosakata'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'kosakata_id' => $item->kosakata_id,
                    'bentuk_kosakata_id' => $item->bentuk_kosakata_id,
                    'kanji' => $item->kanji,
                    'furigana' => $item->furigana,
                    'romaji' => $item->romaji,
                    'arti' => $item->arti,
                    'audio' => $item->audio,
                ];
            });

        // Ambil semua kosakata untuk dropdown
        $availableVocabularies = Kosakata::select('id', 'kanji', 'arti')->get()->map(function ($vocab) {
            return [
                'id' => $vocab->id,
                'kanji' => $vocab->kanji,
                'arti' => $vocab->arti,
            ];
        });

        // Ambil semua bentuk kosakata untuk dropdown
        $availableVocabularyForms = BentukKosakata::select('id', 'bentuk', 'id_kosakata')->get()->map(function ($form) {
            return [
                'id' => $form->id,
                'bentuk' => $form->bentuk,
                'kosakata_id' => $form->id_kosakata,
            ];
        });



        return Inertia::render('Admin/ContohKalimatAdmin', [
            'exampleSentences' => $exampleSentences,
            'availableVocabularies' => $availableVocabularies,
            'availableVocabularyForms' => $availableVocabularyForms,
        ]);
    }

    public function storeContohKalimat(Request $request)
    {
        $data = $request->validate([
            'kosakata_id' => 'nullable|string|exists:kosakatas,id',
            'bentuk_kosakata_id' => 'nullable|string|exists:bentuk_kosakatas,id',
            'kanji' => 'nullable|string',
            'furigana' => 'nullable|string',
            'romaji' => 'required|string',
            'arti' => 'required|string',
            'audio' => 'nullable|string',
        ]);
        // Pastikan salah satu terisi
        if (empty($data['kosakata_id']) && empty($data['bentuk_kosakata_id'])) {
            return redirect()->back()->with('error', 'Isi salah satu: Kosakata atau Bentuk Kosakata!');
        }
        $data['id'] = Str::uuid()->toString();
        ContohKalimat::create($data);
        return redirect()->back()->with('success', 'Contoh kalimat berhasil ditambahkan.');
    }

    public function updateContohKalimat(Request $request, $id)
    {
        $data = $request->validate([
            // kosakata_id dan bentuk_kosakata_id tidak perlu diubah saat edit
            'kanji' => 'nullable|string',
            'furigana' => 'nullable|string',
            'romaji' => 'required|string',
            'arti' => 'required|string',
            'audio' => 'nullable|string',
        ]);
        $kalimat = ContohKalimat::findOrFail($id);
        $kalimat->update($data);
        return redirect()->back()->with('success', 'Contoh kalimat berhasil diupdate.');
    }

    public function destroyContohKalimat($id)
    {
        $kalimat = ContohKalimat::findOrFail($id);
        $kalimat->delete();
        return redirect()->back()->with('success', 'Contoh kalimat berhasil dihapus.');
    }

    public function indexSoalKosakata()
    {
        // Ambil semua soal kuis kosakata beserta relasi kosakata
        $quizzes = \App\Models\SoalKosakata::with('kosakata')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'kosakata_id' => $item->kosakata_id,
                    'level' => $item->level,
                    'soal_kanji' => $item->soal_kanji,
                    'soal_furigana' => $item->soal_furigana,
                    'soal_romaji' => $item->soal_romaji,
                    'soal_arti' => $item->soal_arti,
                    'opsi_a_kanji' => $item->opsi_a_kanji,
                    'opsi_a_furigana' => $item->opsi_a_furigana,
                    'opsi_a_romaji' => $item->opsi_a_romaji,
                    'opsi_a_arti' => $item->opsi_a_arti,
                    'opsi_b_kanji' => $item->opsi_b_kanji,
                    'opsi_b_furigana' => $item->opsi_b_furigana,
                    'opsi_b_romaji' => $item->opsi_b_romaji,
                    'opsi_b_arti' => $item->opsi_b_arti,
                    'opsi_c_kanji' => $item->opsi_c_kanji,
                    'opsi_c_furigana' => $item->opsi_c_furigana,
                    'opsi_c_romaji' => $item->opsi_c_romaji,
                    'opsi_c_arti' => $item->opsi_c_arti,
                    'opsi_d_kanji' => $item->opsi_d_kanji,
                    'opsi_d_furigana' => $item->opsi_d_furigana,
                    'opsi_d_romaji' => $item->opsi_d_romaji,
                    'opsi_d_arti' => $item->opsi_d_arti,
                    'jawaban_benar' => $item->jawaban_benar,
                ];
            });

        // Ambil semua kosakata untuk dropdown
        $availableVocabularies = \App\Models\Kosakata::select('id', 'kanji', 'arti')->get()->map(function ($vocab) {
            return [
                'id' => $vocab->id,
                'kanji' => $vocab->kanji,
                'arti' => $vocab->arti,
            ];
        });

        return Inertia::render('Admin/KuisKosakataAdmin', [
            'vocabularyQuizzes' => $quizzes,
            'availableVocabularies' => $availableVocabularies,
        ]);
    }
}
