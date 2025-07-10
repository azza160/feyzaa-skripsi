<?php

namespace Database\Seeders;

use App\Models\Kosakata;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KosakataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kosakata::insert([
            //watashi
            [
                'id' => 'KOSA-001',
                'kanji' => '私',
                'furigana' => 'わたし',
                'romaji' => 'watashi',
                'arti' => 'saya',
                'deskripsi' => 'Kata ganti orang pertama yang digunakan untuk menyebut diri sendiri, biasanya dalam situasi formal dan netral.',
                'catatan' => 'Umum dipakai oleh semua gender dalam situasi formal atau netral.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748798650/watashi_-_1_lfe36z.mp3',
            ],
            // kare
            [
                'id' => 'KOSA-002',
                'kanji' => '彼',
                'furigana' => 'かれ',
                'romaji' => 'kare',
                'arti' => 'dia (laki-laki)',
                'deskripsi' => 'Kata ganti orang ketiga untuk menyebut pria atau pacar laki-laki dalam konteks informal dan formal.',
                'catatan' => 'Dapat juga berarti pacar laki-laki dalam konteks hubungan romantis.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748798811/kare-2_l4pzss.mp3',
            ],
            // kanojo
            [
                'id' => 'KOSA-003',
                'kanji' => '彼女',
                'furigana' => 'かのじょ',
                'romaji' => 'kanojo',
                'arti' => 'dia (perempuan) atau pacar',
                'deskripsi' => 'Kata ganti orang ketiga untuk menyebut perempuan atau pacar perempuan dalam berbagai konteks.',
                'catatan' => 'Sering digunakan dalam percakapan sehari-hari untuk merujuk pada “dia” perempuan atau pacar.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748798981/kanojo-3_tlmp1v.mp3',
            ],
            // namae
            [
                'id' => 'KOSA-004',
                'kanji' => '名前',
                'furigana' => 'なまえ',
                'romaji' => 'namae',
                'arti' => 'nama',
                'deskripsi' => 'Kata benda yang berarti nama seseorang atau sesuatu, digunakan saat memperkenalkan diri atau menanyakan nama.',
                'catatan' => 'Biasanya digunakan dalam situasi perkenalan atau bertanya identitas.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799082/namae-4_gdbmm1.mp3',
            ],
            // jikan
            [
                'id' => 'KOSA-005',
                'kanji' => '時間',
                'furigana' => 'じかん',
                'romaji' => 'jikan',
                'arti' => 'waktu',
                'deskripsi' => 'Kata benda yang menunjukkan konsep waktu atau durasi, sering dipakai untuk menyatakan jam atau periode waktu.',
                'catatan' => 'Sering digunakan untuk membicarakan durasi atau waktu dalam percakapan sehari-hari.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799217/jikan_-_5_xc026b.mp3',
            ],
            // taberu
            [
                'id' => 'KOSA-006',
                'kanji' => '食べる',
                'furigana' => 'たべる',
                'romaji' => 'taberu',
                'arti' => 'makan',
                'deskripsi' => 'Digunakan untuk menyatakan tindakan makan atau memakan sesuatu.',
                'catatan' => 'Sering digunakan dalam konteks makan atau minum. Contoh: 食べる (makan), 飲む (minum).',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799322/taberu-6_xjxan6.mp3',
            ],
            // iku
            [
                'id' => 'KOSA-007',
                'kanji' => '行く',
                'furigana' => 'いく',
                'romaji' => 'iku',
                'arti' => 'pergi',
                'deskripsi' => 'Digunakan untuk menyatakan tindakan pergi ke suatu tempat.',
                'catatan' => 'Sering digunakan dengan partikel 「へ」atau「に」untuk menunjukkan arah atau tujuan. Contoh: 学校へ行く (Pergi ke sekolah).',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799515/iku-7_yr7npc.mp3',
            ],

            // miru
            [
                'id' => 'KOSA-008',
                'kanji' => '見る',
                'furigana' => 'みる',
                'romaji' => 'miru',
                'arti' => 'melihat, menonton',
                'deskripsi' => 'Digunakan untuk menyatakan tindakan melihat atau menonton sesuatu.',
                'catatan' => 'Biasa dipakai untuk kegiatan seperti menonton TV, film, atau melihat sesuatu. Contoh: 映画を見る (Menonton film).',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799596/miru-8_axlaeh.mp3',
            ],

            //kuru
            [
                    'id' => 'KOSA-009',
                    'kanji' => '来る',
                    'furigana' => 'くる',
                    'romaji' => 'kuru',
                    'arti' => 'datang',
                    'deskripsi' => 'Digunakan untuk menyatakan tindakan datang ke suatu tempat.',
                    'catatan' => 'Kata kerja tidak beraturan. Digunakan saat subjek mendekati pembicara. Contoh: 友だちが来る (Teman datang).',
                    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799681/kuru-9_jawwsz.mp3',
            ],

            // suru
            [
                'id' => 'KOSA-010',
                'kanji' => 'する',
                'furigana' => 'する',
                'romaji' => 'suru',
                'arti' => 'melakukan',
                'deskripsi' => 'Kata kerja serbaguna yang digunakan untuk menyatakan tindakan melakukan sesuatu.',
                'catatan' => 'Kata kerja tidak beraturan. Sering digunakan dengan kata benda untuk membentuk kata kerja, misalnya 勉強する (belajar), 運動する (berolahraga).',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799785/suru-10_ctxbod.mp3',
            ],

            // Tambahan 5 kosakata baru
            [
                'id' => 'KOSA-011',
                'kanji' => '山',
                'furigana' => 'やま',
                'romaji' => 'yama',
                'arti' => 'gunung',
                'deskripsi' => 'Kata benda yang berarti gunung atau pegunungan.',
                'catatan' => 'Digunakan untuk menyebut gunung secara umum.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799900/yama-11.mp3',
            ],
            [
                'id' => 'KOSA-012',
                'kanji' => '川',
                'furigana' => 'かわ',
                'romaji' => 'kawa',
                'arti' => 'sungai',
                'deskripsi' => 'Kata benda yang berarti sungai.',
                'catatan' => 'Sering digunakan dalam nama tempat.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799910/kawa-12.mp3',
            ],
            [
                'id' => 'KOSA-013',
                'kanji' => '空',
                'furigana' => 'そら',
                'romaji' => 'sora',
                'arti' => 'langit',
                'deskripsi' => 'Kata benda yang berarti langit.',
                'catatan' => 'Biasa digunakan dalam puisi atau percakapan sehari-hari.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799920/sora-13.mp3',
            ],
            [
                'id' => 'KOSA-014',
                'kanji' => '花',
                'furigana' => 'はな',
                'romaji' => 'hana',
                'arti' => 'bunga',
                'deskripsi' => 'Kata benda yang berarti bunga.',
                'catatan' => 'Digunakan untuk menyebut bunga secara umum.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799930/hana-14.mp3',
            ],
            [
                'id' => 'KOSA-015',
                'kanji' => '魚',
                'furigana' => 'さかな',
                'romaji' => 'sakana',
                'arti' => 'ikan',
                'deskripsi' => 'Kata benda yang berarti ikan.',
                'catatan' => 'Sering digunakan dalam percakapan tentang makanan.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799940/sakana-15.mp3',
            ],
        ]);
    }
}
