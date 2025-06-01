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
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784323/a-1_ha8yha.wav',
            'huruf_id' => 'H-GO-A', // Sesuaikan dengan id dari huruf
        ]);

        Contoh_Penggunaan::create([
            'kata' => 'あいさつ',
            'romaji' => 'aisatsu',
            'arti' => 'Salam',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784338/a-2_qah8pc.wav',
            'huruf_id' => 'H-GO-A',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'あお',
            'romaji' => 'ao',
            'arti' => 'Biru',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784349/a-3_c91tqf.wav',
            'huruf_id' => 'H-GO-A',
        ]);
        //end a

        //i
        Contoh_Penggunaan::create([
            'kata' => 'いぬ',
            'romaji' => 'inu',
            'arti' => 'Anjing',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784385/i-1_yr3sie.wav',
            'huruf_id' => 'H-GO-I',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'いえ',
            'romaji' => 'ie',
            'arti' => 'Rumah',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784398/i-2_fzqzgl.wav',
            'huruf_id' => 'H-GO-I',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'いちご',
            'romaji' => 'ichigo',
            'arti' => 'Stroberi',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784410/i-3_b1e0lf.wav',
            'huruf_id' => 'H-GO-I',
        ]);
        //end i

        //u
        Contoh_Penggunaan::create([
            'kata' => 'うみ',
            'romaji' => 'umi',
            'arti' => 'Laut',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784436/u-1_jannou.wav',
            'huruf_id' => 'H-GO-U',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'うた',
            'romaji' => 'uta',
            'arti' => 'Lagu',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784448/u-2_egm2jh.wav',
            'huruf_id' => 'H-GO-U',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'うし',
            'romaji' => 'ushi',
            'arti' => 'Sapi',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784462/u-3_rfq6ws.wav',
            'huruf_id' => 'H-GO-U',
        ]);
        //end u

        //e
        Contoh_Penggunaan::create([
            'kata' => 'えんぴつ',
            'romaji' => 'enpitsu',
            'arti' => 'Pensil',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784482/e-1_asjpky.wav',
            'huruf_id' => 'H-GO-E',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'えき',
            'romaji' => 'eki',
            'arti' => 'Stasiun',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784495/e-2_ydbtc4.wav',
            'huruf_id' => 'H-GO-E',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'えがお',
            'romaji' => 'egao',
            'arti' => 'Senyum',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784508/e-3_u4a5ro.wav',
            'huruf_id' => 'H-GO-E',
        ]);
        //end e

        //o
        Contoh_Penggunaan::create([
            'kata' => 'おはよう',
            'romaji' => 'ohayou',
            'arti' => 'Selamat pagi',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784530/o-1_ocop4s.wav',
            'huruf_id' => 'H-GO-O',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'おちゃ',
            'romaji' => 'ocha',
            'arti' => 'Teh',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784544/o-2_uhepuc.wav',
            'huruf_id' => 'H-GO-O',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'おかね',
            'romaji' => 'okane',
            'arti' => 'Uang',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784556/o-3_uyc7nl.wav',
            'huruf_id' => 'H-GO-O',
        ]);
        //ond o

        //ka
        Contoh_Penggunaan::create([
            'kata' => 'かさ',
            'romaji' => 'kasa',
            'arti' => 'Payung',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784647/ka-1_y5kxmr.wav',
            'huruf_id' => 'H-GO-KA',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'かみ',
            'romaji' => 'kami',
            'arti' => 'Kertas / Rambut (tergantung konteks)',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784660/ka-2_ig0nm2.wav',
            'huruf_id' => 'H-GO-KA',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'かぞく',
            'romaji' => 'kazoku',
            'arti' => 'Keluarga',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748784671/ka-3_gggo2x.wav',
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
