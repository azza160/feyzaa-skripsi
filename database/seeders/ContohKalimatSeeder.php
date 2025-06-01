<?php

namespace Database\Seeders;

use App\Models\ContohKalimat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ContohKalimatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ContohKalimat::insert([
            //  watashi
            [
                'kosakata_id' => 'KOSA-001',
                'bentuk_kosakata_id' => null,
                'kanji' => '私は学生です',
                'furigana' => 'わたしはがくせいです',
                'romaji' => 'watashi wa gakusei desu',
                'arti' => 'Saya seorang pelajar',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748798681/contoh_kalimat_watashi-1_lvlmn3.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-001',
                'bentuk_kosakata_id' => null,
                'kanji' => '私は毎日日本語を勉強します',
                'furigana' => 'わたしはまいにちにほんごをべんきょうします',
                'romaji' => 'watashi wa mainichi nihongo o benkyou shimasu',
                'arti' => 'Saya belajar bahasa Jepang setiap hari',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748798743/ck_watashi-2_yvy2lc.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-001',
                'bentuk_kosakata_id' => null,
                'kanji' => '私は日本の文化について深く理解したいと思っています',
                'furigana' => 'わたしはにほんのぶんかについてふかくりかいしたいとおもっています',
                'romaji' => 'watashi wa nihon no bunka ni tsuite fukaku rikai shitai to omotteimasu',
                'arti' => 'Saya ingin memahami budaya Jepang secara mendalam',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748798776/ck-watashi-3_n1mora.mp3',
            ],
            //end watashi

            // kare
            [
                'kosakata_id' => 'KOSA-002',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼はとても優しい人です',
                'furigana' => 'かれはとてもやさしいひとです',
                'romaji' => 'kare wa totemo yasashii hito desu',
                'arti' => 'Dia (laki-laki) adalah orang yang sangat baik hati',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748798906/ck-kare-1_wgvphj.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-002',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼は毎朝ジョギングをしています',
                'furigana' => 'かれはまいあさジョギングをしています',
                'romaji' => 'kare wa maiasa jogingu o shiteimasu',
                'arti' => 'Dia (laki-laki) rutin jogging setiap pagi',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748798926/ck-kare-2_b2g4ra.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-002',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼は問題を冷静に分析して解決策を見つけました',
                'furigana' => 'かれはもんだいをれいせいにぶんせきしてかいけつさくをみつけました',
                'romaji' => 'kare wa mondai o reisei ni bunseki shite kaiketsusaku o mitsukemashita',
                'arti' => 'Dia (laki-laki) menganalisis masalah dengan tenang dan menemukan solusi',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748798942/ck-kare-3_ml0cfh.mp3',
            ],
            //end kare

            // kanojo
            [
                'kosakata_id' => 'KOSA-003',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼女はかわいい猫を飼っています',
                'furigana' => 'かのじょはかわいいねこをかっています',
                'romaji' => 'kanojo wa kawaii neko o katteimasu',
                'arti' => 'Dia (perempuan) memelihara kucing yang lucu',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799003/ck-kanojo-1_xsfrwc.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-003',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼女は仕事で大きな成功を収めました',
                'furigana' => 'かのじょはしごとでおおきなせいこうをおさめました',
                'romaji' => 'kanojo wa shigoto de ookina seikou o osamemashita',
                'arti' => 'Dia (perempuan) meraih kesuksesan besar dalam pekerjaannya',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799020/ck-kanojo-2_wjzxc3.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-003',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼女の意見はこのプロジェクトの方向性を変える重要なものでした',
                'furigana' => 'かのじょのいけんはこのプロジェクトのほうこうせいをかえるじゅうようなものでした',
                'romaji' => 'kanojo no iken wa kono purojekuto no houkousei o kaeru juuyou na mono deshita',
                'arti' => 'Pendapatnya mengubah arah proyek ini menjadi sesuatu yang penting',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799039/ck-kanojo-3_ze0fvh.mp3',
            ],
            //end kanojo

            // namae
            [
                'kosakata_id' => 'KOSA-004',
                'bentuk_kosakata_id' => null,
                'kanji' => '名前を教えてください',
                'furigana' => 'なまえをおしえてください',
                'romaji' => 'namae o oshiete kudasai',
                'arti' => 'Tolong beri tahu nama Anda',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799126/ck-namae-1_o12l3x.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-004',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼の名前は日本で有名です',
                'furigana' => 'かれのなまえはにほんでゆうめいです',
                'romaji' => 'kare no namae wa nihon de yuumei desu',
                'arti' => 'Namanya terkenal di Jepang',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799141/ck-namae-2_sta7q9.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-004',
                'bentuk_kosakata_id' => null,
                'kanji' => '新しいプロジェクトの名前を慎重に選ばなければなりません',
                'furigana' => 'あたらしいプロジェクトのなまえをしんちょうにえらばなければなりません',
                'romaji' => 'atarashii purojekuto no namae o shinchou ni erabanakereba narimasen',
                'arti' => 'Kita harus memilih nama proyek baru dengan hati-hati',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799176/ck-namae-3_stru9g.mp3',
            ],
            //end namae

            // jikan
            [
                'kosakata_id' => 'KOSA-005',
                'bentuk_kosakata_id' => null,
                'kanji' => '時間がありますか？',
                'furigana' => 'じかんがありますか？',
                'romaji' => 'jikan ga arimasu ka?',
                'arti' => 'Apakah kamu punya waktu?',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799238/ck-jikan-1_kvwrgp.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-005',
                'bentuk_kosakata_id' => null,
                'kanji' => '会議の時間は午後3時です',
                'furigana' => 'かいぎのじかんはごごさんじです',
                'romaji' => 'kaigi no jikan wa gogo sanji desu',
                'arti' => 'Waktu rapat adalah pukul 3 sore',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799262/ck-jikan-2_ewo5hl.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-005',
                'bentuk_kosakata_id' => null,
                'kanji' => '時間を無駄にしないように計画を立てましょう',
                'furigana' => 'じかんをむだにしないようにけいかくをたてましょう',
                'romaji' => 'jikan o muda ni shinai you ni keikaku o tatemashou',
                'arti' => 'Mari buat rencana supaya tidak membuang waktu',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799280/ck-jikan-3_kao5c0.mp3',
            ],
            //end jikan

            // taberu
            [
                'kosakata_id' => 'KOSA-006',
                'bentuk_kosakata_id' => null,
                'kanji' => '私は寿司を食べる',
                'furigana' => 'わたしはすしをたべる',
                'romaji' => 'watashi wa sushi o taberu',
                'arti' => 'Saya makan sushi',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799358/ck-taberu-1_hcbesb.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-006',
                'bentuk_kosakata_id' => null,
                'kanji' => '毎朝、パンを食べてから学校に行きます毎朝、パンを食べてから学校に行きます',
                'furigana' => 'まいあさ、パンをたべてからがっこうにいきます',
                'romaji' => 'mai asa, pan o tabete kara gakkou ni ikimasu',
                'arti' => 'Setiap pagi, saya makan roti sebelum pergi ke sekolah',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799431/ck-taberu-2_rlirhp.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-006',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼は健康のために野菜をたくさん食べるようにしています',
                'furigana' => 'かれはけんこうのためにやさいをたくさんたべるようにしています',
                'romaji' => 'kare wa kenkou no tame ni yasai o takusan taberu you ni shiteimasu',
                'arti' => 'Dia berusaha makan banyak sayuran demi kesehatan',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799463/ck-taberu-3_qmk9sy.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-006',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼女はよくチョコレートを食べる。',
                'furigana' => 'かのじょはよくちょこれーとをたべる',
                'romaji' => 'kanojo wa yoku chokoreeto o taberu',
                'arti' => 'Dia sering makan cokelat.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748803882/ck-taberu-4_b56gho.mp3',
            ],
            // contoh kaliamt bentuk sopan
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-001', // ID bentuk sopan yang sebelumnya kita buat
                'kanji' => '私は毎日りんごを食べます。',
                'furigana' => 'わたしはまいにちりんごをたべます',
                'romaji' => 'watashi wa mainichi ringo o tabemasu',
                'arti' => 'Saya makan apel setiap hari.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748804172/ck-tabemasu_xrte26.mp3',
            ],
            //contoh kalimat bentuk negatif
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-002', // ID bentuk negatif yang udah kita buat
                'kanji' => '彼女は夜遅くには食べないようにしています。',
                'furigana' => 'かのじょはよるおそくにはたべないようにしています',
                'romaji' => 'kanojo wa yoru osoku ni wa tabenai you ni shiteimasu',
                'arti' => 'Dia berusaha untuk tidak makan larut malam.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748804283/ck-tabenai_onnf7j.mp3',
            ],
            //contoh kalimat bentuk negatif sopan
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-003', // ID untuk bentuk negatif sopan
                'kanji' => '私は朝ごはんを食べませんでしたが、コーヒーを飲みました',
                'furigana' => 'わたしはあさごはんをたべませんでしたが、こーひーをのみました',
                'romaji' => 'watashi wa asagohan o tabemasen deshita ga, koohii o nomimashita',
                'arti' => 'Saya tidak makan sarapan, tapi saya minum kopi.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748804435/ck-negatif-sopan-tabemasendeshita_yrmapo.mp3',
            ],
            //contoh kalimat bentuk lampau
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-004', // ID untuk bentuk lampau (informal/past)
                'kanji' => '昨日、友だちと一緒に寿司を食べた。',
                'furigana' => 'きのう、ともだちといっしょにすしをたべた',
                'romaji' => 'kinou, tomodachi to issho ni sushi o tabeta',
                'arti' => 'Kemarin, aku makan sushi bersama teman.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748804573/ck-tabeta_mkljq1.mp3',
            ],
            //contoh kalimat bentuk lampau sopan
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-005', // ID untuk bentuk lampau sopan
                'kanji' => '今朝、パンと卵を食べました。',
                'furigana' => 'けさ、ぱんとたまごをたべました',
                'romaji' => 'kesa, pan to tamago o tabemashita',
                'arti' => 'Tadi pagi saya makan roti dan telur.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748804739/ck-tabemashita_vlequj.mp3',
            ],
            //contoh kalimat bentuk lampau negatif
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-006', // ID untuk bentuk negatif lampau informal
                'kanji' => '昨日は忙しくて昼ごはんを食べなかった。',
                'furigana' => 'きのうはいそがしくてひるごはんをたべなかった',
                'romaji' => 'kinou wa isogashikute hirugohan o tabenakatta',
                'arti' => 'Kemarin aku sibuk jadi tidak makan siang.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748804824/ck-tabenakatta_yfisdp.mp3',
            ],
            //contoh kalimat bentuk lampau negatif sopan
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-007', // ID untuk bentuk negatif lampau sopan
                'kanji' => '朝は時間がなくて朝ごはんを食べませんでした。',
                'furigana' => 'あさはじかんがなくてあさごはんをたべませんでした',
                'romaji' => 'asa wa jikan ga nakute asagohan o tabemasen deshita',
                'arti' => 'Pagi tadi saya tidak sarapan karena tidak punya waktu.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748805071/ttsMP3.com_VoiceText_2025-6-2_2-9-4_ry5a8z.mp3',
            ],
            // contoh kalimat bentuk potensial
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-008', // ID untuk bentuk potensial
                'kanji' => '私は辛い食べ物を食べられます。',
                'furigana' => 'わたしはからいたべものをたべられます',
                'romaji' => 'watashi wa karai tabemono o taberaremasu',
                'arti' => 'Saya bisa makan makanan pedas.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748805262/ck-taberaremasu_b445ij.mp3',
            ],

            //contoh kalimat bentuk perintah
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-009', // ID untuk bentuk perintah
                'kanji' => 'もっと食べろ！',
                'furigana' => 'もっとたべろ！',
                'romaji' => 'motto tabero!',
                'arti' => 'Makanlah lebih banyak!',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748806485/ck-tabero_nwfnwt.mp3',
            ],
            
            // contoh kalimat bentuk larangan
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-010', // ID untuk bentuk larangan
                'kanji' => 'これは食べるな！',
                'furigana' => 'これはたべるな！',
                'romaji' => 'kore wa taberu na!',
                'arti' => 'Jangan makan ini!',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748807133/ttsMP3.com_VoiceText_2025-6-2_2-16-15_htb04o.mp3',
            ],
            //contoh kalimat bentuk て
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-011', // ID untuk bentuk te
                'kanji' => '朝ごはんを食べて、学校に行きました。',
                'furigana' => 'あさごはんをたべて、がっこうにいきました。',
                'romaji' => 'asagohan o tabete, gakkou ni ikimashita.',
                'arti' => 'Setelah makan sarapan, saya pergi ke sekolah.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748805452/ck-tabete_fhsg29.mp3',
            ], 
            //end taberu

            // iku
            [
                'kosakata_id' => 'KOSA-007',
                'bentuk_kosakata_id' => null,
                'kanji' => '私は学校に行く',
                'furigana' => 'わたしはがっこうにいく',
                'romaji' => 'watashi wa gakkou ni iku',
                'arti' => 'Saya pergi ke sekolah',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799499/ck-iku-1_thu2la.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-007',
                'bentuk_kosakata_id' => null,
                'kanji' => '毎朝駅まで歩いて行く',
                'furigana' => 'まいあさえきまであるいていく',
                'romaji' => 'mai asa eki made aruite iku',
                'arti' => 'Setiap pagi saya berjalan kaki ke stasiun',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799533/ck-iku-2_dsmyuu.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-007',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼は一人で旅行に行く',
                'furigana' => 'かれはひとりでりょこうにいく',
                'romaji' => 'kare wa hitori de ryokou ni iku',
                'arti' => 'Dia pergi berlibur sendirian',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799549/ck-iku-3_cq9uup.mp3',
            ],
            //end iku

            // miru
            [
                'kosakata_id' => 'KOSA-008',
                'bentuk_kosakata_id' => null,
                'kanji' => '私は映画を見る',
                'furigana' => 'わたしはえいがをみる',
                'romaji' => 'watashi wa eiga o miru',
                'arti' => 'Saya menonton film',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799612/ck-miru-1_k02ayv.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-008',
                'bentuk_kosakata_id' => null,
                'kanji' => '毎日ニュースを見る',
                'furigana' => 'まいにちにゅーすをみる',
                'romaji' => 'mainichi nyuusu o miru',
                'arti' => 'Saya menonton berita setiap hari',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799632/ck-miru-2_dsv290.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-008',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼女は空を見るのが好きだ',
                'furigana' => 'かのじょはそらをみるのがすきだ',
                'romaji' => 'kanojo wa sora o miru no ga suki da',
                'arti' => 'Dia suka melihat langit',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799648/ck-miru-3_eieh2a.mp3',
            ],
            //end miru

            // kuru
            [
                'kosakata_id' => 'KOSA-009',
                'bentuk_kosakata_id' => null,
                'kanji' => '友だちが来る',
                'furigana' => 'ともだちがくる',
                'romaji' => 'tomodachi ga kuru',
                'arti' => 'Teman datang',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799715/ck-kuru-1_nmvbnh.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-009',
                'bentuk_kosakata_id' => null,
                'kanji' => '私は明日学校に来る',
                'furigana' => 'わたしはあしたがっこうにくる',
                'romaji' => 'watashi wa ashita gakkou ni kuru',
                'arti' => 'Saya datang ke sekolah besok',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799730/ck-kuru-2_nnlptv.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-009',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼はよく家に来る',
                'furigana' => 'かれはよくいえにくる',
                'romaji' => 'kare wa yoku ie ni kuru',
                'arti' => 'Dia sering datang ke rumah',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799747/ck-kuru-3_fpxulv.mp3',
            ],
            //end kuru

            // suru
            [
                'kosakata_id' => 'KOSA-010',
                'bentuk_kosakata_id' => null,
                'kanji' => '私は勉強をする',
                'furigana' => 'わたしはべんきょうをする',
                'romaji' => 'watashi wa benkyou o suru',
                'arti' => 'Saya belajar',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799811/ck-suru-1_o4h2dt.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-010',
                'bentuk_kosakata_id' => null,
                'kanji' => '毎日運動をすることは健康に良い',
                'furigana' => 'まいにちうんどうをすることはけんこうによい',
                'romaji' => 'mainichi undou o suru koto wa kenkou ni yoi',
                'arti' => 'Berolahraga setiap hari baik untuk kesehatan',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799827/ck-suru-2_uslwts.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-010',
                'bentuk_kosakata_id' => null,
                'kanji' => '彼は成功するために多くの努力をする',
                'furigana' => 'かれはせいこうするためにおおくのどりょくをする',
                'romaji' => 'kare wa seikou suru tame ni ooku no doryoku o suru',
                'arti' => 'Dia berusaha keras untuk meraih kesuksesan',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1748799845/ck-suru-3_tnf7ld.mp3',
            ],

            //end suru

           
        ]);
    }
}
