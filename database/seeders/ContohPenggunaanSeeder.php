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
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754786855/ttsMP3.com_VoiceText_2025-8-10_7-46-24_wv8f0t.mp3',
            'huruf_id' => 'H-GO-KI',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'きのこ',
            'romaji' => 'kinoko',
            'arti' => 'Jamur',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754786947/ttsMP3.com_VoiceText_2025-8-10_7-48-31_x7wgew.mp3',
            'huruf_id' => 'H-GO-KI',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'きた',
            'romaji' => 'kita',
            'arti' => 'Utara',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754787053/ttsMP3.com_VoiceText_2025-8-10_7-50-31_pxx6zb.mp3',
            'huruf_id' => 'H-GO-KI',
        ]);
        //end ki

        //ku
        Contoh_Penggunaan::create([
            'kata' => 'くるま',
            'romaji' => 'kuruma',
            'arti' => 'Mobil',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754787247/ttsMP3.com_VoiceText_2025-8-10_7-53-29_px4fud.mp3',
            'huruf_id' => 'H-GO-KU',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'くち',
            'romaji' => 'kuchi',
            'arti' => 'Mulut',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754787326/ttsMP3.com_VoiceText_2025-8-10_7-55-13_tpbcpn.mp3',
            'huruf_id' => 'H-GO-KU',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'くも',
            'romaji' => 'kumo',
            'arti' => 'Awan / Laba-laba (tergantung kanji)',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754787365/ttsMP3.com_VoiceText_2025-8-10_7-55-51_n8csd0.mp3',
            'huruf_id' => 'H-GO-KU',
        ]);        
        //end ku

        //ke
        Contoh_Penggunaan::create([
            'kata' => 'けむり',
            'romaji' => 'kemuri',
            'arti' => 'Asap',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754787510/ttsMP3.com_VoiceText_2025-8-10_7-58-2_c1uyw8.mp3',
            'huruf_id' => 'H-GO-KE',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'けしごむ',
            'romaji' => 'keshigomu',
            'arti' => 'Penghapus',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754787550/ttsMP3.com_VoiceText_2025-8-10_7-58-56_g8nj5c.mp3',
            'huruf_id' => 'H-GO-KE',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'けが',
            'romaji' => 'kega',
            'arti' => 'Luka / Cedera',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754787597/ttsMP3.com_VoiceText_2025-8-10_7-59-43_mo1wk4.mp3',
            'huruf_id' => 'H-GO-KE',
        ]);
        //end ke

        //ko
        Contoh_Penggunaan::create([
            'kata' => 'こえ',
            'romaji' => 'koe',
            'arti' => 'Suara',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754787738/ttsMP3.com_VoiceText_2025-8-10_8-1-51_bbw0hc.mp3',
            'huruf_id' => 'H-GO-KO',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'ここ',
            'romaji' => 'koko',
            'arti' => 'Di sini',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754787781/ttsMP3.com_VoiceText_2025-8-10_8-2-44_d51cbl.mp3',
            'huruf_id' => 'H-GO-KO',
        ]);
        
        Contoh_Penggunaan::create([
            'kata' => 'こども',
            'romaji' => 'kodomo',
            'arti' => 'Anak-anak',
            'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754787828/ttsMP3.com_VoiceText_2025-8-10_8-3-33_uylngc.mp3',
            'huruf_id' => 'H-GO-KO',
        ]);
        
        //end ko

        //end ka groups

        // sa groups
 

        //sa
       Contoh_Penggunaan::create([
    'kata' => 'さくら',
    'romaji' => 'sakura',
    'arti' => 'bunga sakura',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754789830/ttsMP3.com_VoiceText_2025-8-10_8-36-42_kxtxln.mp3',
    'huruf_id' => 'H-GO-SA',
]);

Contoh_Penggunaan::create([
    'kata' => 'さかな',
    'romaji' => 'sakana',
    'arti' => 'ikan',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754789868/ttsMP3.com_VoiceText_2025-8-10_8-37-9_tsitqi.mp3',
    'huruf_id' => 'H-GO-SA',
]);

Contoh_Penggunaan::create([
    'kata' => 'さようなら',
    'romaji' => 'sayounara',
    'arti' => 'selamat tinggal',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754789898/ttsMP3.com_VoiceText_2025-8-10_8-38-5_bmunhg.mp3',
    'huruf_id' => 'H-GO-SA',
]);
        //end sa

        //SHI
        Contoh_Penggunaan::create([
    'kata' => 'しろ',
    'romaji' => 'shiro',
    'arti' => 'putih',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754790207/ttsMP3.com_VoiceText_2025-8-10_8-42-49_e1az57.mp3',
    'huruf_id' => 'H-GO-SHI',
]);

Contoh_Penggunaan::create([
    'kata' => 'しま',
    'romaji' => 'shima',
    'arti' => 'pulau',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754790256/ttsMP3.com_VoiceText_2025-8-10_8-43-25_srfibh.mp3',
    'huruf_id' => 'H-GO-SHI',
]);

Contoh_Penggunaan::create([
    'kata' => 'しんぶん',
    'romaji' => 'shinbun',
    'arti' => 'koran',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754790282/ttsMP3.com_VoiceText_2025-8-10_8-44-5_sb0puc.mp3',
    'huruf_id' => 'H-GO-SHI',
]);

        //END SHI

        //su 
        Contoh_Penggunaan::create([
    'kata' => 'すし',
    'romaji' => 'sushi',
    'arti' => 'sushi',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754790655/ttsMP3.com_VoiceText_2025-8-10_8-50-8_egqprz.mp3',
    'huruf_id' => 'H-GO-SU',
]);

Contoh_Penggunaan::create([
    'kata' => 'すいか',
    'romaji' => 'suika',
    'arti' => 'semangka',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754790698/ttsMP3.com_VoiceText_2025-8-10_8-50-47_aacmev.mp3',
    'huruf_id' => 'H-GO-SU',
]);

Contoh_Penggunaan::create([
    'kata' => 'すき',
    'romaji' => 'suki',
    'arti' => 'suka',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754790734/ttsMP3.com_VoiceText_2025-8-10_8-51-36_lq2zhm.mp3',
    'huruf_id' => 'H-GO-SU',
]);

        //end su

        //se
        Contoh_Penggunaan::create([
    'kata' => 'せかい',
    'romaji' => 'sekai',
    'arti' => 'dunia',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754791242/ttsMP3.com_VoiceText_2025-8-10_9-0-16_x5gomf.mp3',
    'huruf_id' => 'H-GO-SE',
]);

Contoh_Penggunaan::create([
    'kata' => 'せんせい',
    'romaji' => 'sensei',
    'arti' => 'guru',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754791295/ttsMP3.com_VoiceText_2025-8-10_9-0-36_ajfun0.mp3',
    'huruf_id' => 'H-GO-SE',
]);

Contoh_Penggunaan::create([
    'kata' => 'せみ',
    'romaji' => 'semi',
    'arti' => 'kepik jangkrik musim panas (semi)',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754791324/ttsMP3.com_VoiceText_2025-8-10_9-1-28_mea6n7.mp3',
    'huruf_id' => 'H-GO-SE',
]);

        //end se

        //so
Contoh_Penggunaan::create([
    'kata' => 'そら',
    'romaji' => 'sora',
    'arti' => 'langit',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754791685/ttsMP3.com_VoiceText_2025-8-10_9-7-38_pj01su.mp3',
    'huruf_id' => 'H-GO-SO',
]);

Contoh_Penggunaan::create([
    'kata' => 'そうじ',
    'romaji' => 'souji',
    'arti' => 'bersih-bersih',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754791723/ttsMP3.com_VoiceText_2025-8-10_9-8-3_u4cm6s.mp3',
    'huruf_id' => 'H-GO-SO',
]);

Contoh_Penggunaan::create([
    'kata' => 'そば',
    'romaji' => 'soba',
    'arti' => 'mi soba',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754791776/ttsMP3.com_VoiceText_2025-8-10_9-8-53_koeuun.mp3',
    'huruf_id' => 'H-GO-SO',
]);

        //end so

        // end sa groups

        
      
        

     
    }
}
