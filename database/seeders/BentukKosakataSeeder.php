<?php

namespace Database\Seeders;

use App\Models\BentukKosakata;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BentukKosakataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BentukKosakata::insert([
            // 6 bentuk untuk 'taberu'
            [
                'id' => 'BENTUK-001',
                'id_kosakata' => 'KOSA-006',
                'bentuk' => 'sopan',
                'kanji' => '食べます',
                'furigana' => 'たべます',
                'romaji' => 'tabemasu',
                'arti' => 'makan (sopan)',
                'deskripsi' => 'Bentuk sopan dari kata kerja 食べる (taberu). Digunakan dalam percakapan formal atau saat berbicara dengan orang yang lebih tua, guru, atau atasan. Ini adalah bentuk yang paling umum digunakan dalam pelajaran bahasa Jepang dasar.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748801523/bentuk-sopan-tabemasu_hpwdgx.mp3',
            ],
            [
                'id' => 'BENTUK-002',
                'id_kosakata' => 'KOSA-006',
                'bentuk' => 'negatif',
                'kanji' => '食べない',
                'furigana' => 'たべない',
                'romaji' => 'tabenai',
                'arti' => 'tidak makan',
                'deskripsi' => 'Bentuk negatif informal dari 食べる (taberu). Digunakan dalam percakapan santai untuk menyatakan bahwa seseorang tidak makan atau tidak akan makan. Sering digunakan oleh teman sebaya atau orang yang akrab.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748801602/bentuk-sopan-tabenai_j4rqdt.mp3',
            ],
            [
                'id' => 'BENTUK-003',
                'id_kosakata' => 'KOSA-006',
                'bentuk' => 'negatif sopan',
                'kanji' => '食べません',
                'furigana' => 'たべません',
                'romaji' => 'tabemasen',
                'arti' => 'tidak makan (sopan)',
                'deskripsi' => 'Bentuk negatif sopan dari 食べます (tabemasu). Digunakan dalam situasi formal untuk menyatakan penolakan atau ketidakinginan untuk makan dengan nada yang sopan dan hormat.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748801678/ttsMP3.com_VoiceText_2025-6-2_1-14-47_m6n3hm.mp3',
            ],
            [
                'id' => 'BENTUK-004',
                'id_kosakata' => 'KOSA-006',
                'bentuk' => 'lampau',
                'kanji' => '食べた',
                'furigana' => 'たべた',
                'romaji' => 'tabeta',
                'arti' => 'sudah makan',
                'deskripsi' => 'Bentuk lampau informal dari 食べる (taberu). Digunakan untuk menyatakan bahwa tindakan makan telah selesai dilakukan. Umumnya dipakai dalam percakapan sehari-hari yang santai.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748801741/ttsMP3.com_VoiceText_2025-6-2_1-16-4_v07ihm.mp3',
            ],
            [
                'id' => 'BENTUK-005',
                'id_kosakata' => 'KOSA-006',
                'bentuk' => 'lampau sopan',
                'kanji' => '食べました',
                'furigana' => 'たべました',
                'romaji' => 'tabemashita',
                'arti' => 'sudah makan (sopan)',
                'deskripsi' => 'Bentuk lampau sopan dari 食べます (tabemasu). Digunakan untuk menyatakan bahwa seseorang telah makan dalam konteks yang sopan dan formal.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748801795/ttsMP3.com_VoiceText_2025-6-2_1-17-8_e2nln8.mp3',
            ],
            [
                'id' => 'BENTUK-006',
                'id_kosakata' => 'KOSA-006',
                'bentuk' => 'negatif lampau',
                'kanji' => '食べなかった',
                'furigana' => 'たべなかった',
                'romaji' => 'tabenakatta',
                'arti' => 'tidak makan (lampau)',
                'deskripsi' => 'Bentuk negatif lampau informal dari 食べる (taberu). Digunakan untuk menyatakan bahwa seseorang tidak makan di masa lalu. Sering digunakan dalam percakapan santai.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748801856/ttsMP3.com_VoiceText_2025-6-2_1-18-6_qhfl5t.mp3',
            ],
            [
                'id' => 'BENTUK-007',
                'id_kosakata' => 'KOSA-006',
                'bentuk' => 'negatif lampau sopan',
                'kanji' => '食べませんでした',
                'furigana' => 'たべませんでした',
                'romaji' => 'tabemasen deshita',
                'arti' => 'tidak makan (lampau sopan)',
                'deskripsi' => 'Bentuk negatif lampau sopan dari 食べます (tabemasu). Dipakai dalam situasi formal untuk menyatakan bahwa seseorang tidak makan pada waktu tertentu di masa lalu.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748801899/ttsMP3.com_VoiceText_2025-6-2_1-18-50_q8rd6f.mp3',
            ],
            [
                'id' => 'BENTUK-008',
                'id_kosakata' => 'KOSA-006',
                'bentuk' => 'potensial',
                'kanji' => '食べられる',
                'furigana' => 'たべられる',
                'romaji' => 'taberareru',
                'arti' => 'bisa makan',
                'deskripsi' => 'Bentuk potensial dari 食べる (taberu). Digunakan untuk menyatakan kemampuan atau kemungkinan untuk makan. Contohnya: この魚は食べられる (Ikan ini bisa dimakan).',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748801954/ttsMP3.com_VoiceText_2025-6-2_1-19-48_sxsdkc.mp3',
            ],
            [
                'id' => 'BENTUK-009',
                'id_kosakata' => 'KOSA-006',
                'bentuk' => 'perintah',
                'kanji' => '食べろ',
                'furigana' => 'たべろ',
                'romaji' => 'tabero',
                'arti' => 'makanlah!',
                'deskripsi' => 'Bentuk perintah informal dari 食べる (taberu). Biasanya digunakan dalam situasi yang tidak formal atau saat memberi instruksi tegas, seperti dari orang tua ke anak.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748801995/ttsMP3.com_VoiceText_2025-6-2_1-20-28_iqnykv.mp3',
            ],
            [
                'id' => 'BENTUK-010',
                'id_kosakata' => 'KOSA-006',
                'bentuk' => 'larangan',
                'kanji' => '食べるな',
                'furigana' => 'たべるな',
                'romaji' => 'taberu na',
                'arti' => 'jangan makan!',
                'deskripsi' => 'Bentuk larangan informal dari 食べる (taberu). Digunakan untuk memerintahkan seseorang agar tidak makan sesuatu. Biasanya digunakan dalam konteks yang cukup kuat atau darurat.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748802058/ttsMP3.com_VoiceText_2025-6-2_1-21-24_uf5edm.mp3',
            ],
            [
                'id' => 'BENTUK-011',
                'id_kosakata' => 'KOSA-006',
                'bentuk' => 'bentuk て',
                'kanji' => '食べて',
                'furigana' => 'たべて',
                'romaji' => 'tabete',
                'arti' => 'makan (bentuk sambung)',
                'deskripsi' => 'Bentuk て (te-form) dari 食べる (taberu). Sering digunakan untuk menyambungkan kalimat, meminta izin, atau dalam bentuk progresif seperti 食べている (sedang makan). Salah satu bentuk paling penting dalam tata bahasa Jepang.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748802103/ttsMP3.com_VoiceText_2025-6-2_1-22-6_leyuvt.mp3',
            ],
        ]);
    }
}
