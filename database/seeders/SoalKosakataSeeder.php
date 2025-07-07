<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SoalKosakata;
use App\Models\Kosakata;

class SoalKosakataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Contoh soal intermediate untuk kosakata "KOSA-001" (watashi)
        SoalKosakata::create([
            'kosakata_id' => 'KOSA-001',
            'level' => 'intermediate',
            'soal_kanji' => '私は____です。',
            'soal_furigana' => 'わたしは____です。',
            'soal_romaji' => 'watashi wa ____ desu.',
            'soal_arti' => 'Saya adalah ____.',
            'opsi_a_kanji' => '学生',
            'opsi_a_furigana' => 'がくせい',
            'opsi_a_romaji' => 'gakusei',
            'opsi_a_arti' => 'mahasiswa',
            'opsi_b_kanji' => '先生',
            'opsi_b_furigana' => 'せんせい',
            'opsi_b_romaji' => 'sensei',
            'opsi_b_arti' => 'guru',
            'opsi_c_kanji' => '医者',
            'opsi_c_furigana' => 'いしゃ',
            'opsi_c_romaji' => 'isha',
            'opsi_c_arti' => 'dokter',
            'opsi_d_kanji' => '会社員',
            'opsi_d_furigana' => 'かいしゃいん',
            'opsi_d_romaji' => 'kaishain',
            'opsi_d_arti' => 'pegawai perusahaan',
            'jawaban_benar' => 'a',
        ]);

        // Contoh soal advanced untuk kosakata "KOSA-006" (taberu)
        SoalKosakata::create([
            'kosakata_id' => 'KOSA-006',
            'level' => 'advanced',
            'soal_kanji' => '次の文の中で「食べる」の使い方として最も自然なものを選びなさい。',
            'soal_furigana' => 'つぎのぶんのなかで「たべる」のつかいかたとしてもっともしぜんなものをえらびなさい。',
            'soal_romaji' => 'Tsugi no bun no naka de "taberu" no tsukaikata to shite mottomo shizen na mono o erabinasai.',
            'soal_arti' => 'Pilih kalimat yang paling natural untuk penggunaan "makan".',
            'opsi_a_kanji' => '私は朝ごはんを食べます。',
            'opsi_a_furigana' => 'わたしはあさごはんをたべます。',
            'opsi_a_romaji' => 'watashi wa asagohan o tabemasu.',
            'opsi_a_arti' => 'Saya makan sarapan.',
            'opsi_b_kanji' => '私は本を食べます。',
            'opsi_b_furigana' => 'わたしはほんをたべます。',
            'opsi_b_romaji' => 'watashi wa hon o tabemasu.',
            'opsi_b_arti' => 'Saya makan buku.',
            'opsi_c_kanji' => '私は水を食べます。',
            'opsi_c_furigana' => 'わたしはみずをたべます。',
            'opsi_c_romaji' => 'watashi wa mizu o tabemasu.',
            'opsi_c_arti' => 'Saya makan air.',
            'opsi_d_kanji' => '私はペンを食べます。',
            'opsi_d_furigana' => 'わたしはぺんをたべます。',
            'opsi_d_romaji' => 'watashi wa pen o tabemasu.',
            'opsi_d_arti' => 'Saya makan pena.',
            'jawaban_benar' => 'a',
        ]);
    }
}
