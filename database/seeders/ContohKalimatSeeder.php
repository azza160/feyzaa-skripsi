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

            //arigatou
             [
                'kosakata_id' => 'KOSA-002',
                'bentuk_kosakata_id' => null,
                'kanji' => '手伝ってくれてありがとうございます。',
                'furigana' => 'てつだってくれてありがとうございます。',
                'romaji' => 'Tetsudatte kurete arigatou gozaimasu',
                'arti' => 'Terima kasih banyak sudah membantu saya',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754804010/ttsMP3.com_VoiceText_2025-8-10_12-32-47_zgskrs.mp3',
            ],
              [
                'kosakata_id' => 'KOSA-002',
                'bentuk_kosakata_id' => null,
                'kanji' => 'ご連絡ありがとうございます。',
                'furigana' => 'ごれんらくありがとうございます。',
                'romaji' => 'Go-renraku arigatou gozaimasu.',
                'arti' => 'Terima kasih atas pemberitahuan Anda.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754804180/ttsMP3.com_VoiceText_2025-8-10_12-36-2_cwn7sv.mp3',
            ],
            //end arigatou

            //kore
              [
                'kosakata_id' => 'KOSA-003',
                'bentuk_kosakata_id' => null,
                'kanji' => 'これは私の本です。',
                'furigana' => 'これは わたしの ほんです。',
                'romaji' => 'Kore wa watashi no hon desu.',
                'arti' => 'Ini adalah buku saya.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754805317/ttsMP3.com_VoiceText_2025-8-10_12-55-8_wirfvk.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-003',
                'bentuk_kosakata_id' => null,
                'kanji' => 'これをください。',
                'furigana' => 'これを ください。',
                'romaji' => 'Kore o kudasai.',
                'arti' => 'Tolong beri saya ini.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754805420/ttsMP3.com_VoiceText_2025-8-10_12-56-49_htob42.mp3',
            ],
            //end kore

            //sore
            [
                'kosakata_id' => 'KOSA-004',
                'bentuk_kosakata_id' => null,
                'kanji' => 'それはあなたのかばんですか？',
                'furigana' => 'それはあなたのかばんですか？',
                'romaji' => 'Sore wa anata no kaban desu ka?',
                'arti' => 'Apakah itu tasmu?',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754807751/ttsMP3.com_VoiceText_2025-8-10_13-35-38_ccn213.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-004',
                'bentuk_kosakata_id' => null,
                'kanji' => 'それを見せてください。',
                'furigana' => 'それを みせて ください',
                'romaji' => 'Sore o misete kudasai.',
                'arti' => ' Tolong tunjukkan itu.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754807834/ttsMP3.com_VoiceText_2025-8-10_13-37-4_eljmxn.mp3',
            ],
            //end sore

            //are
             [
                'kosakata_id' => 'KOSA-005',
                'bentuk_kosakata_id' => null,
                'kanji' => 'あれは山です。',
                'furigana' => 'あれは やまです。',
                'romaji' => ' Are wa yama desu.',
                'arti' => ' Itu adalah gunung.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754809886/ttsMP3.com_VoiceText_2025-8-10_14-11-16_vkc6zl.mp3',
            ],
             [
                'kosakata_id' => 'KOSA-005',
                'bentuk_kosakata_id' => null,
                'kanji' => 'あれは昔の写真です。',
                'furigana' => 'あれは むかしの しゃしんです。',
                'romaji' => 'Are wa mukashi no shashin desu.',
                'arti' => 'Itu adalah foto lama.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754810022/ttsMP3.com_VoiceText_2025-8-10_14-13-30_gn8yld.mp3',
            ],

            //end are

            //nomimasu
            [
                'kosakata_id' => 'KOSA-006',
                'bentuk_kosakata_id' => null,
                'kanji' => '毎朝お茶を飲みます。',
                'furigana' => 'まいあさ おちゃを のみます。',
                'romaji' => ' Maiasa ocha o nomimasu.',
                'arti' => 'Saya minum teh setiap pagi.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754811795/ttsMP3.com_VoiceText_2025-8-10_14-43-5_yjfh03.mp3',
            ],
             [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-002',
                'kanji' => '水を飲むことは大切です。',
                'furigana' => 'みずを のむことは たいせつです。',
                'romaji' => 'Mizu o nomu koto wa taisetsu desu.',
                'arti' => 'Minum air itu penting.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754811936/ttsMP3.com_VoiceText_2025-8-10_14-45-25_wp0cxh.mp3',
            ],
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-003',
                'kanji' => '昨日はお酒を飲みませんでした。',
                'furigana' => 'きのうは おさけを のみませんでした。',
                'romaji' => 'Kinou wa osake o nomimasen deshita.',
                'arti' => 'Kemarin saya tidak minum alkohol.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754812029/ttsMP3.com_VoiceText_2025-8-10_14-46-59_xtt9jq.mp3',
            ],
            //end nomimasu

            //iku
            [
                'kosakata_id' => 'KOSA-007',
                'bentuk_kosakata_id' => null,
                'kanji' => '明日学校に行きます。',
                'furigana' => 'あした がっこうに いきます。',
                'romaji' => 'Ashita gakkou ni ikimasu.',
                'arti' => 'Besok saya pergi ke sekolah.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754813298/ttsMP3.com_VoiceText_2025-8-10_15-8-6_vaqbgs.mp3',
            ],
             [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-004',
                'kanji' => '友達と海へ行く。',
                'furigana' => 'ともだちと うみへ いく。',
                'romaji' => 'omodachi to umi e iku.',
                'arti' => 'Pergi ke pantai dengan teman.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754813412/ttsMP3.com_VoiceText_2025-8-10_15-9-58_nyxopb.mp3',
            ],
             [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-005',
                'kanji' => '今日は会社に行きません。',
                'furigana' => 'きょうは かいしゃに いきません。',
                'romaji' => 'Kyou wa kaisha ni ikimasen.',
                'arti' => 'Hari ini saya tidak pergi ke kantor.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754813503/ttsMP3.com_VoiceText_2025-8-10_15-11-32_a8u0ku.mp3',
            ],
            //end iku

            //kimasu
             
            [
                'kosakata_id' => 'KOSA-008',
                'bentuk_kosakata_id' => null,
                'kanji' => '明日友達が家に来ます。',
                'furigana' => ' あした ともだちが いえに きます。',
                'romaji' => 'Ashita tomodachi ga ie ni kimasu.',
                'arti' => 'Besok teman datang ke rumah.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754815186/ttsMP3.com_VoiceText_2025-8-10_15-39-5_jngsh4.mp3',
            ],
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-006',
                'kanji' => '学校に来るのが好きです。',
                'furigana' => 'がっこうに くるのが すきです。',
                'romaji' => 'Gakkou ni kuru no ga suki desu.',
                'arti' => 'Saya suka datang ke sekolah.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754815385/ttsMP3.com_VoiceText_2025-8-10_15-42-55_gf0ruk.mp3',
            ],
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-007',
                'kanji' => '今日は会社に来ません。',
                'furigana' => 'きょうは かいしゃに きません。',
                'romaji' => 'Kyou wa kaisha ni kimasen.',
                'arti' => 'Hari ini saya tidak datang ke kantor.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754815535/ttsMP3.com_VoiceText_2025-8-10_15-45-23_qdqzd9.mp3',
            ],
        
            //end kimasu

            //mimasu
 [
                'kosakata_id' => 'KOSA-009',
                'bentuk_kosakata_id' => null,
                'kanji' => '毎晩テレビを見ます。',
                'furigana' => ' まいばん テレビを みます。',
                'romaji' => 'Maiban terebi o mimasu.',
                'arti' => 'Saya menonton televisi setiap malam.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754817053/ttsMP3.com_VoiceText_2025-8-10_16-10-42_wsm4xp.mp3',
            ],
             [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-008',
                'kanji' => '映画を見るのが好きです。',
                'furigana' => 'えいがを みるのが すきです。',
                'romaji' => 'Eiga o miru no ga suki desu.',
                'arti' => 'Saya suka menonton film.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754817164/ttsMP3.com_VoiceText_2025-8-10_16-12-26_irkb8p.mp3',
            ],
            [
                'kosakata_id' => null,
                'bentuk_kosakata_id' => 'BENTUK-009',
                'kanji' => '昨日はテレビを見ませんでした。',
                'furigana' => 'きのうは テレビを みませんでした。',
                'romaji' => 'Kinou wa terebi o mimasen deshita.',
                'arti' => 'Kemarin saya tidak menonton televisi.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754817256/ttsMP3.com_VoiceText_2025-8-10_16-14-2_1_qjsgv1.mp3',
            ],
        
        
            //end mimasu

            //hon
[
                'kosakata_id' => 'KOSA-010',
                'bentuk_kosakata_id' => null,
                'kanji' => '私は新しい本を買いました。',
                'furigana' => 'わたしは あたらしい ほんを かいました。',
                'romaji' => 'Watashi wa atarashii hon o kaimashita.',
                'arti' => 'Saya membeli buku baru.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754818142/ttsMP3.com_VoiceText_2025-8-10_16-28-47_a5zpay.mp3',
            ],
            [
                'kosakata_id' => 'KOSA-010',
                'bentuk_kosakata_id' => null,
                'kanji' => '図書館で本を読みます。',
                'furigana' => ' としょかんで ほんを よみます。',
                'romaji' => 'Toshokan de hon o yomimasu.',
                'arti' => 'Saya membaca buku di perpustakaan.',
                'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754818236/ttsMP3.com_VoiceText_2025-8-10_16-30-14_c5hdru.mp3',
            ],

     
           
        ]);
    }
}
