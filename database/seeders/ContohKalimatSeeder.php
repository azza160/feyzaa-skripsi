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

            // Bentuk kosakata only (6 data)
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-001',
                'kanji' => '私はりんごを食べます',
                'furigana' => 'わたしはりんごをたべます',
                'romaji' => 'watashi wa ringo o tabemasu',
                'arti' => 'Saya makan apel (sopan)',
                'audio' => null,
            ],
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-002',
                'kanji' => '私はりんごを食べない',
                'furigana' => 'わたしはりんごをたべない',
                'romaji' => 'watashi wa ringo o tabenai',
                'arti' => 'Saya tidak makan apel',
                'audio' => null,
            ],
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-003',
                'kanji' => '彼は学校へ行きます',
                'furigana' => 'かれはがっこうへいきます',
                'romaji' => 'kare wa gakkou e ikimasu',
                'arti' => 'Dia pergi ke sekolah (sopan)',
                'audio' => null,
            ],
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-004',
                'kanji' => '彼は学校へ行かない',
                'furigana' => 'かれはがっこうへいかない',
                'romaji' => 'kare wa gakkou e ikanai',
                'arti' => 'Dia tidak pergi ke sekolah',
                'audio' => null,
            ],
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-005',
                'kanji' => '私は映画を見ます',
                'furigana' => 'わたしはえいがをみます',
                'romaji' => 'watashi wa eiga o mimasu',
                'arti' => 'Saya menonton film (sopan)',
                'audio' => null,
            ],
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-006',
                'kanji' => '私は映画を見ない',
                'furigana' => 'わたしはえいがをみない',
                'romaji' => 'watashi wa eiga o minai',
                'arti' => 'Saya tidak menonton film',
                'audio' => null,
            ],
        ]);
    }
}
