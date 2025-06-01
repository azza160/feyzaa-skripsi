<?php

namespace Database\Seeders;

use App\Models\Contoh_Penggunaan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContohPenggunaanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        //a
        Contoh_Penggunaan::create([
            'kata' => 'ありがとう',
            'romaji' => 'arigatou',
            'arti' => 'Terima kasih',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1747371319/hiragana-a-contoh_penggunaan-arigatou-audio_l310z5.wav',
            'huruf_id' => 'H-GO-A', // Sesuaikan dengan id dari huruf
        ]);

        Contoh_Penggunaan::create([
            'kata' => 'あいさつ',
            'romaji' => 'aisatsu',
            'arti' => 'Salam',
            'audio' => null,
            'huruf_id' => 'H-GO-A',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'あお',
            'romaji' => 'ao',
            'arti' => 'Biru',
            'audio' => null,
            'huruf_id' => 'H-GO-A',
        ]);
        //end a

        //i
        Contoh_Penggunaan::create([
            'kata' => 'いぬ',
            'romaji' => 'inu',
            'arti' => 'Anjing',
            'audio' => null,
            'huruf_id' => 'H-GO-I',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'いえ',
            'romaji' => 'ie',
            'arti' => 'Rumah',
            'audio' => null,
            'huruf_id' => 'H-GO-I',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'いちご',
            'romaji' => 'ichigo',
            'arti' => 'Stroberi',
            'audio' => null,
            'huruf_id' => 'H-GO-I',
        ]);
        //end i

        //u
        Contoh_Penggunaan::create([
            'kata' => 'うみ',
            'romaji' => 'umi',
            'arti' => 'Laut',
            'audio' => null,
            'huruf_id' => 'H-GO-U',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'うた',
            'romaji' => 'uta',
            'arti' => 'Lagu',
            'audio' => null,
            'huruf_id' => 'H-GO-U',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'うし',
            'romaji' => 'ushi',
            'arti' => 'Sapi',
            'audio' => null,
            'huruf_id' => 'H-GO-U',
        ]);
        //end u

        //e
        Contoh_Penggunaan::create([
            'kata' => 'えんぴつ',
            'romaji' => 'enpitsu',
            'arti' => 'Pensil',
            'audio' => null,
            'huruf_id' => 'H-GO-E',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'えき',
            'romaji' => 'eki',
            'arti' => 'Stasiun',
            'audio' => null,
            'huruf_id' => 'H-GO-E',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'えがお',
            'romaji' => 'egao',
            'arti' => 'Senyum',
            'audio' => null,
            'huruf_id' => 'H-GO-E',
        ]);
        //end e

        //o
        Contoh_Penggunaan::create([
            'kata' => 'おはよう',
            'romaji' => 'ohayou',
            'arti' => 'Selamat pagi',
            'audio' => null,
            'huruf_id' => 'H-GO-O',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'おちゃ',
            'romaji' => 'ocha',
            'arti' => 'Teh',
            'audio' => null,
            'huruf_id' => 'H-GO-O',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'おかね',
            'romaji' => 'okane',
            'arti' => 'Uang',
            'audio' => null,
            'huruf_id' => 'H-GO-O',
        ]);
        //ond o

        //ka
        Contoh_Penggunaan::create([
            'kata' => 'かさ',
            'romaji' => 'kasa',
            'arti' => 'Payung',
            'audio' => null,
            'huruf_id' => 'H-GO-KA',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'かみ',
            'romaji' => 'kami',
            'arti' => 'Kertas / Rambut (tergantung konteks)',
            'audio' => null,
            'huruf_id' => 'H-GO-KA',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'かぞく',
            'romaji' => 'kazoku',
            'arti' => 'Keluarga',
            'audio' => null,
            'huruf_id' => 'H-GO-KA',
        ]);       
        //end ka

        //ki
        Contoh_Penggunaan::create([
            'kata' => 'きく',
            'romaji' => 'kiku',
            'arti' => 'Mendengar / Bertanya (tergantung konteks)',
            'audio' => null,
            'huruf_id' => 'H-GO-KI',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'きのこ',
            'romaji' => 'kinoko',
            'arti' => 'Jamur',
            'audio' => null,
            'huruf_id' => 'H-GO-KI',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'きた',
            'romaji' => 'kita',
            'arti' => 'Utara',
            'audio' => null,
            'huruf_id' => 'H-GO-KI',
        ]);
        //end ki

        //ku
        Contoh_Penggunaan::create([
            'kata' => 'くるま',
            'romaji' => 'kuruma',
            'arti' => 'Mobil',
            'audio' => null,
            'huruf_id' => 'H-GO-KU',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'くち',
            'romaji' => 'kuchi',
            'arti' => 'Mulut',
            'audio' => null,
            'huruf_id' => 'H-GO-KU',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'くも',
            'romaji' => 'kumo',
            'arti' => 'Awan / Laba-laba (tergantung kanji)',
            'audio' => null,
            'huruf_id' => 'H-GO-KU',
        ]);        
        //end ku

        //ke
        Contoh_Penggunaan::create([
            'kata' => 'けむり',
            'romaji' => 'kemuri',
            'arti' => 'Asap',
            'audio' => null,
            'huruf_id' => 'H-GO-KE',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'けしごむ',
            'romaji' => 'keshigomu',
            'arti' => 'Penghapus',
            'audio' => null,
            'huruf_id' => 'H-GO-KE',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'けが',
            'romaji' => 'kega',
            'arti' => 'Luka / Cedera',
            'audio' => null,
            'huruf_id' => 'H-GO-KE',
        ]);
        //end ke

        //ko
        Contoh_Penggunaan::create([
            'kata' => 'こえ',
            'romaji' => 'koe',
            'arti' => 'Suara',
            'audio' => null,
            'huruf_id' => 'H-GO-KO',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'ここ',
            'romaji' => 'koko',
            'arti' => 'Di sini',
            'audio' => null,
            'huruf_id' => 'H-GO-KO',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'こども',
            'romaji' => 'kodomo',
            'arti' => 'Anak-anak',
            'audio' => null,
            'huruf_id' => 'H-GO-KO',
        ]);
        
        //end ko

        
      
        

     
    }
}
