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
        // Ambil semua kosakata dari KOSA-001 sampai KOSA-015
        $kosakatas = [
            [
                'id' => 'KOSA-001', 'kanji' => '私', 'furigana' => 'わたし', 'romaji' => 'watashi', 'arti' => 'saya'
            ],
            [
                'id' => 'KOSA-002', 'kanji' => '彼', 'furigana' => 'かれ', 'romaji' => 'kare', 'arti' => 'dia (laki-laki)'
            ],
            [
                'id' => 'KOSA-003', 'kanji' => '彼女', 'furigana' => 'かのじょ', 'romaji' => 'kanojo', 'arti' => 'dia (perempuan) atau pacar'
            ],
            [
                'id' => 'KOSA-004', 'kanji' => '名前', 'furigana' => 'なまえ', 'romaji' => 'namae', 'arti' => 'nama'
            ],
            [
                'id' => 'KOSA-005', 'kanji' => '時間', 'furigana' => 'じかん', 'romaji' => 'jikan', 'arti' => 'waktu'
            ],
            [
                'id' => 'KOSA-006', 'kanji' => '食べる', 'furigana' => 'たべる', 'romaji' => 'taberu', 'arti' => 'makan'
            ],
            [
                'id' => 'KOSA-007', 'kanji' => '行く', 'furigana' => 'いく', 'romaji' => 'iku', 'arti' => 'pergi'
            ],
            [
                'id' => 'KOSA-008', 'kanji' => '見る', 'furigana' => 'みる', 'romaji' => 'miru', 'arti' => 'melihat, menonton'
            ],
            [
                'id' => 'KOSA-009', 'kanji' => '来る', 'furigana' => 'くる', 'romaji' => 'kuru', 'arti' => 'datang'
            ],
            [
                'id' => 'KOSA-010', 'kanji' => 'する', 'furigana' => 'する', 'romaji' => 'suru', 'arti' => 'melakukan'
            ],
            [
                'id' => 'KOSA-011', 'kanji' => '山', 'furigana' => 'やま', 'romaji' => 'yama', 'arti' => 'gunung'
            ],
            [
                'id' => 'KOSA-012', 'kanji' => '川', 'furigana' => 'かわ', 'romaji' => 'kawa', 'arti' => 'sungai'
            ],
            [
                'id' => 'KOSA-013', 'kanji' => '空', 'furigana' => 'そら', 'romaji' => 'sora', 'arti' => 'langit'
            ],
            [
                'id' => 'KOSA-014', 'kanji' => '花', 'furigana' => 'はな', 'romaji' => 'hana', 'arti' => 'bunga'
            ],
            [
                'id' => 'KOSA-015', 'kanji' => '魚', 'furigana' => 'さかな', 'romaji' => 'sakana', 'arti' => 'ikan'
            ],
        ];

        // Daftar soal kontekstual per kosakata (2 soal per kosakata, 4 versi kalimat)
        $contextSoal = [
            // KOSA-001: watashi
            [
                'kanji' => '自己紹介のとき、「____は田中です」と言います。',
                'furigana' => 'じこしょうかいのとき、「____はたなかです」といいます。',
                'romaji' => 'Jikoshoukai no toki, "____ wa Tanaka desu" to iimasu.',
                'arti' => 'Saat memperkenalkan diri, saya berkata: "____ adalah Tanaka."',
            ],
            [
                'kanji' => 'フォーマルな場面で自分を指すときは____を使います。',
                'furigana' => 'ふぉーまるなばめんでじぶんをさすときは____をつかいます。',
                'romaji' => 'Foomaru na bamen de jibun o sasu toki wa ____ o tsukaimasu.',
                'arti' => 'Dalam situasi formal, untuk menyebut diri sendiri digunakan _____.',
            ],
            // KOSA-002: kare
            [
                'kanji' => 'ゆきさんは今日学校を休みました。____は病気です。',
                'furigana' => 'ゆきさんはきょうがっこうをやすみました。____はびょうきです。',
                'romaji' => 'Yuki-san wa kyou gakkou o yasumimashita. ____ wa byouki desu.',
                'arti' => 'Yuki tidak masuk sekolah hari ini. ____ sedang sakit.',
            ],
            [
                'kanji' => '「彼」は日本語で「____」という意味です。',
                'furigana' => '「かれ」はにほんごで「____」といういみです。',
                'romaji' => '"Kare" wa nihongo de "____" to iu imi desu.',
                'arti' => 'Dalam bahasa Jepang, "kare" berarti ____.',
            ],
            // KOSA-003: kanojo
            [
                'kanji' => 'さくらさんは私の友達です。____は歌が上手です。',
                'furigana' => 'さくらさんはわたしのともだちです。____はうたがじょうずです。',
                'romaji' => 'Sakura-san wa watashi no tomodachi desu. ____ wa uta ga jouzu desu.',
                'arti' => 'Sakura adalah temanku. ____ pandai bernyanyi.',
            ],
            [
                'kanji' => '「彼女」は日本語で「____」という意味です。',
                'furigana' => '「かのじょ」はにほんごで「____」といういみです。',
                'romaji' => '"Kanojo" wa nihongo de "____" to iu imi desu.',
                'arti' => 'Dalam bahasa Jepang, "kanojo" berarti ____.',
            ],
            // KOSA-004: namae
            [
                'kanji' => '自己紹介で最初に言うのは____です。',
                'furigana' => 'じこしょうかいでさいしょにいうのは____です。',
                'romaji' => 'Jikoshoukai de saisho ni iu no wa ____ desu.',
                'arti' => 'Hal pertama yang diucapkan saat perkenalan adalah ____.',
            ],
            [
                'kanji' => '「名前」は日本語で「____」と書きます。',
                'furigana' => '「なまえ」はにほんごで「____」とかきます。',
                'romaji' => '"Namae" wa nihongo de "____" to kakimasu.',
                'arti' => 'Dalam bahasa Jepang, "nama" ditulis ____.',
            ],
            // KOSA-005: jikan
            [
                'kanji' => '先生が「今____は何時ですか」と聞きました。',
                'furigana' => 'せんせいが「いま____はなんじですか」とききました。',
                'romaji' => 'Sensei ga "ima ____ wa nanji desu ka" to kikimashita.',
                'arti' => 'Guru bertanya, "Sekarang ____ jam berapa?"',
            ],
            [
                'kanji' => '「時間」は毎日大切です。____を守りましょう。',
                'furigana' => '「じかん」はまいにちたいせつです。____をまもりましょう。',
                'romaji' => '"Jikan" wa mainichi taisetsu desu. ____ o mamorimashou.',
                'arti' => 'Waktu itu penting setiap hari. Mari kita jaga ____.',
            ],
            // KOSA-006: taberu
            [
                'kanji' => '学校へ行く前にご飯を____。',
                'furigana' => 'がっこうへいくまえにごはんを____。',
                'romaji' => 'Gakkou e iku mae ni gohan o ____.',
                'arti' => 'Sebelum berangkat sekolah, saya ____ nasi terlebih dahulu.',
            ],
            [
                'kanji' => '朝ごはんを____のが好きです。',
                'furigana' => 'あさごはんを____のがすきです。',
                'romaji' => 'Asagohan o ____ no ga suki desu.',
                'arti' => 'Saya suka ____ sarapan pagi.',
            ],
            // KOSA-007: iku
            [
                'kanji' => '毎朝、バスで学校に____。',
                'furigana' => 'まいあさ、ばすでがっこうに____。',
                'romaji' => 'Maiasa, basu de gakkou ni ____.',
                'arti' => 'Setiap pagi, saya ____ ke sekolah naik bus.',
            ],
            [
                'kanji' => '昼ごはんのあとで公園に____。',
                'furigana' => 'ひるごはんのあとでこうえんに____。',
                'romaji' => 'Hirugohan no ato de kouen ni ____.',
                'arti' => 'Setelah makan siang, saya ____ ke taman.',
            ],
            // KOSA-008: miru
            [
                'kanji' => '夜、家族と一緒にテレビを____。',
                'furigana' => 'よる、かぞくといっしょにてれびを____。',
                'romaji' => 'Yoru, kazoku to issho ni terebi o ____.',
                'arti' => 'Malam hari, saya ____ televisi bersama keluarga.',
            ],
            [
                'kanji' => '映画館で新しい映画を____。',
                'furigana' => 'えいがかんであたらしいえいがを____。',
                'romaji' => 'Eigakan de atarashii eiga o ____.',
                'arti' => 'Di bioskop, saya ____ film baru.',
            ],
            // KOSA-009: kuru
            [
                'kanji' => '明日、友達が家に____。',
                'furigana' => 'あした、ともだちがいえに____。',
                'romaji' => 'Ashita, tomodachi ga ie ni ____.',
                'arti' => 'Besok, teman saya ____ ke rumah.',
            ],
            [
                'kanji' => 'お客さんはたいてい午後に____。',
                'furigana' => 'おきゃくさんはたいていごごに____。',
                'romaji' => 'Okyakusan wa taitei gogo ni ____.',
                'arti' => 'Tamu biasanya ____ pada sore hari.',
            ],
            // KOSA-010: suru
            [
                'kanji' => '毎日、宿題を____。',
                'furigana' => 'まいにち、しゅくだいを____。',
                'romaji' => 'Mainichi, shukudai o ____.',
                'arti' => 'Setiap hari saya ____ PR.',
            ],
            [
                'kanji' => '運動を____ことは健康に良いです。',
                'furigana' => 'うんどうを____ことはけんこうによいです。',
                'romaji' => 'Undou o ____ koto wa kenkou ni yoi desu.',
                'arti' => 'Melakukan olahraga baik untuk kesehatan.',
            ],
            // KOSA-011: yama
            [
                'kanji' => '富士____は日本で一番高いです。',
                'furigana' => 'ふじ____はにほんでいちばんたかいです。',
                'romaji' => 'Fuji ____ wa nihon de ichiban takai desu.',
                'arti' => 'Gunung Fuji adalah yang tertinggi di Jepang.',
            ],
            [
                'kanji' => '夏休みに____に登りました。',
                'furigana' => 'なつやすみに____にのぼりました。',
                'romaji' => 'Natsuyasumi ni ____ ni noborimashita.',
                'arti' => 'Saat liburan musim panas, saya mendaki ____.',
            ],
            // KOSA-012: kawa
            [
                'kanji' => '子供たちは____のそばで遊んでいます。',
                'furigana' => 'こどもたちは____のそばであそんでいます。',
                'romaji' => 'Kodomotachi wa ____ no soba de asondeimasu.',
                'arti' => 'Anak-anak bermain di tepi ____.',
            ],
            [
                'kanji' => '魚は____の中を泳ぎます。',
                'furigana' => 'さかなは____のなかをおよぎます。',
                'romaji' => 'Sakana wa ____ no naka o oyogimasu.',
                'arti' => 'Ikan berenang di dalam ____.',
            ],
            // KOSA-013: sora
            [
                'kanji' => '鳥が____を飛んでいます。',
                'furigana' => 'とりが____をとんでいます。',
                'romaji' => 'Tori ga ____ o tondeimasu.',
                'arti' => 'Burung terbang di ____.',
            ],
            [
                'kanji' => '晴れた日は____が青いです。',
                'furigana' => 'はれたひは____があおいです。',
                'romaji' => 'Hareta hi wa ____ ga aoi desu.',
                'arti' => 'Saat cerah, ____ berwarna biru.',
            ],
            // KOSA-014: hana
            [
                'kanji' => '公園にきれいな____が咲いています。',
                'furigana' => 'こうえんにきれいな____がさいています。',
                'romaji' => 'Kouen ni kirei na ____ ga saiteimasu.',
                'arti' => 'Di taman, ____ yang indah bermekaran.',
            ],
            [
                'kanji' => '春になるとたくさんの____が咲きます。',
                'furigana' => 'はるになるとたくさんの____がさきます。',
                'romaji' => 'Haru ni naru to takusan no ____ ga sakimasu.',
                'arti' => 'Saat musim semi, banyak ____ yang bermekaran.',
            ],
            // KOSA-015: sakana
            [
                'kanji' => '市場で新鮮な____を買いました。',
                'furigana' => 'いちばでしんせんな____をかいました。',
                'romaji' => 'Ichiba de shinsen na ____ o kaimashita.',
                'arti' => 'Di pasar, saya membeli ____ segar.',
            ],
            [
                'kanji' => '日本人は寿司で生の____を食べます。',
                'furigana' => 'にほんじんはすしでなまの____をたべます。',
                'romaji' => 'Nihonjin wa sushi de nama no ____ o tabemasu.',
                'arti' => 'Orang Jepang makan ____ mentah dalam sushi.',
            ],
        ];

        // Buat 2 soal intermediate kontekstual untuk setiap kosakata
        foreach ($kosakatas as $i => $kosa) {
            // Pilih 3 kosakata lain untuk opsi salah (acak, tidak boleh sama dengan jawaban benar)
            $other = array_filter($kosakatas, fn($k) => $k['id'] !== $kosa['id']);
            shuffle($other);
            $opsi = array_slice($other, 0, 3);

            // Soal 1
            $soal1 = $contextSoal[$i * 2];
        SoalKosakata::create([
                'kosakata_id' => $kosa['id'],
            'level' => 'intermediate',
                'soal_kanji' => $soal1['kanji'],
                'soal_furigana' => $soal1['furigana'],
                'soal_romaji' => $soal1['romaji'],
                'soal_arti' => $soal1['arti'],
                'opsi_a_kanji' => $kosa['kanji'],
                'opsi_a_furigana' => $kosa['furigana'],
                'opsi_a_romaji' => $kosa['romaji'],
                'opsi_a_arti' => $kosa['arti'],
                'opsi_b_kanji' => $opsi[0]['kanji'],
                'opsi_b_furigana' => $opsi[0]['furigana'],
                'opsi_b_romaji' => $opsi[0]['romaji'],
                'opsi_b_arti' => $opsi[0]['arti'],
                'opsi_c_kanji' => $opsi[1]['kanji'],
                'opsi_c_furigana' => $opsi[1]['furigana'],
                'opsi_c_romaji' => $opsi[1]['romaji'],
                'opsi_c_arti' => $opsi[1]['arti'],
                'opsi_d_kanji' => $opsi[2]['kanji'],
                'opsi_d_furigana' => $opsi[2]['furigana'],
                'opsi_d_romaji' => $opsi[2]['romaji'],
                'opsi_d_arti' => $opsi[2]['arti'],
            'jawaban_benar' => 'a',
        ]);

            // Soal 2
            shuffle($other);
            $opsi2 = array_slice($other, 0, 3);
            $soal2 = $contextSoal[$i * 2 + 1];
            SoalKosakata::create([
                'kosakata_id' => $kosa['id'],
                'level' => 'intermediate',
                'soal_kanji' => $soal2['kanji'],
                'soal_furigana' => $soal2['furigana'],
                'soal_romaji' => $soal2['romaji'],
                'soal_arti' => $soal2['arti'],
                'opsi_a_kanji' => $kosa['kanji'],
                'opsi_a_furigana' => $kosa['furigana'],
                'opsi_a_romaji' => $kosa['romaji'],
                'opsi_a_arti' => $kosa['arti'],
                'opsi_b_kanji' => $opsi2[0]['kanji'],
                'opsi_b_furigana' => $opsi2[0]['furigana'],
                'opsi_b_romaji' => $opsi2[0]['romaji'],
                'opsi_b_arti' => $opsi2[0]['arti'],
                'opsi_c_kanji' => $opsi2[1]['kanji'],
                'opsi_c_furigana' => $opsi2[1]['furigana'],
                'opsi_c_romaji' => $opsi2[1]['romaji'],
                'opsi_c_arti' => $opsi2[1]['arti'],
                'opsi_d_kanji' => $opsi2[2]['kanji'],
                'opsi_d_furigana' => $opsi2[2]['furigana'],
                'opsi_d_romaji' => $opsi2[2]['romaji'],
                'opsi_d_arti' => $opsi2[2]['arti'],
                'jawaban_benar' => 'a',
            ]);
        }

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

        // ================= SOAL ADVANCED UNTUK SETIAP KOSAKATA =================
        $advancedQuestions = [
            // KOSA-001: watashi
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk penggunaan "saya" dalam situasi formal.',
                'opsi' => [
                    [
                        'kanji' => '私は会社員です。',
                        'furigana' => 'わたしはかいしゃいんです。',
                        'romaji' => 'Watashi wa kaishain desu.',
                        'arti' => 'Saya adalah pegawai perusahaan.'
                    ],
                    [
                        'kanji' => '私が魚を泳ぎます。',
                        'furigana' => 'わたしがさかなをおよぎます。',
                        'romaji' => 'Watashi ga sakana o oyogimasu.',
                        'arti' => 'Saya berenang sebagai ikan.'
                    ],
                    [
                        'kanji' => '彼は私を食べます。',
                        'furigana' => 'かれはわたしをたべます。',
                        'romaji' => 'Kare wa watashi o tabemasu.',
                        'arti' => 'Dia memakan saya.'
                    ],
                    [
                        'kanji' => '私は花です。',
                        'furigana' => 'わたしははなです。',
                        'romaji' => 'Watashi wa hana desu.',
                        'arti' => 'Saya adalah bunga.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk memperkenalkan diri.',
                'opsi' => [
                    [
                        'kanji' => '私は田中です。',
                        'furigana' => 'わたしはたなかです。',
                        'romaji' => 'Watashi wa Tanaka desu.',
                        'arti' => 'Saya adalah Tanaka.'
                    ],
                    [
                        'kanji' => '私は川を食べます。',
                        'furigana' => 'わたしはかわをたべます。',
                        'romaji' => 'Watashi wa kawa o tabemasu.',
                        'arti' => 'Saya makan sungai.'
                    ],
                    [
                        'kanji' => '私は空を飲みます。',
                        'furigana' => 'わたしはそらをのみます。',
                        'romaji' => 'Watashi wa sora o nomimasu.',
                        'arti' => 'Saya minum langit.'
                    ],
                    [
                        'kanji' => '私は魚です。',
                        'furigana' => 'わたしはさかなです。',
                        'romaji' => 'Watashi wa sakana desu.',
                        'arti' => 'Saya adalah ikan.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-002: kare
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk penggunaan "dia (laki-laki)" dalam percakapan.',
                'opsi' => [
                    [
                        'kanji' => '彼は先生です。',
                        'furigana' => 'かれはせんせいです。',
                        'romaji' => 'Kare wa sensei desu.',
                        'arti' => 'Dia adalah guru.'
                    ],
                    [
                        'kanji' => '彼女は彼です。',
                        'furigana' => 'かのじょはかれです。',
                        'romaji' => 'Kanojo wa kare desu.',
                        'arti' => 'Dia (perempuan) adalah dia (laki-laki).'
                    ],
                    [
                        'kanji' => '彼は花を食べます。',
                        'furigana' => 'かれははなをたべます。',
                        'romaji' => 'Kare wa hana o tabemasu.',
                        'arti' => 'Dia makan bunga.'
                    ],
                    [
                        'kanji' => '彼は空です。',
                        'furigana' => 'かれはそらです。',
                        'romaji' => 'Kare wa sora desu.',
                        'arti' => 'Dia adalah langit.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menjelaskan seseorang yang tidak hadir.',
                'opsi' => [
                    [
                        'kanji' => '彼は今日学校を休みました。',
                        'furigana' => 'かれはきょうがっこうをやすみました。',
                        'romaji' => 'Kare wa kyou gakkou o yasumimashita.',
                        'arti' => 'Dia tidak masuk sekolah hari ini.'
                    ],
                    [
                        'kanji' => '彼は魚を飲みます。',
                        'furigana' => 'かれはさかなをのみます。',
                        'romaji' => 'Kare wa sakana o nomimasu.',
                        'arti' => 'Dia minum ikan.'
                    ],
                    [
                        'kanji' => '彼は山です。',
                        'furigana' => 'かれはやまです。',
                        'romaji' => 'Kare wa yama desu.',
                        'arti' => 'Dia adalah gunung.'
                    ],
                    [
                        'kanji' => '彼は名前を食べます。',
                        'furigana' => 'かれはなまえをたべます。',
                        'romaji' => 'Kare wa namae o tabemasu.',
                        'arti' => 'Dia makan nama.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-003: kanojo
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk penggunaan "dia (perempuan)".',
                'opsi' => [
                    [
                        'kanji' => '彼女は歌が上手です。',
                        'furigana' => 'かのじょはうたがじょうずです。',
                        'romaji' => 'Kanojo wa uta ga jouzu desu.',
                        'arti' => 'Dia pandai bernyanyi.'
                    ],
                    [
                        'kanji' => '彼女は魚を食べます。',
                        'furigana' => 'かのじょはさかなをたべます。',
                        'romaji' => 'Kanojo wa sakana o tabemasu.',
                        'arti' => 'Dia makan ikan.'
                    ],
                    [
                        'kanji' => '彼女は山です。',
                        'furigana' => 'かのじょはやまです。',
                        'romaji' => 'Kanojo wa yama desu.',
                        'arti' => 'Dia adalah gunung.'
                    ],
                    [
                        'kanji' => '彼女は空を飲みます。',
                        'furigana' => 'かのじょはそらをのみます。',
                        'romaji' => 'Kanojo wa sora o nomimasu.',
                        'arti' => 'Dia minum langit.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk memperkenalkan teman perempuan.',
                'opsi' => [
                    [
                        'kanji' => '彼女は私の友達です。',
                        'furigana' => 'かのじょはわたしのともだちです。',
                        'romaji' => 'Kanojo wa watashi no tomodachi desu.',
                        'arti' => 'Dia adalah teman saya.'
                    ],
                    [
                        'kanji' => '彼女は川を食べます。',
                        'furigana' => 'かのじょはかわをたべます。',
                        'romaji' => 'Kanojo wa kawa o tabemasu.',
                        'arti' => 'Dia makan sungai.'
                    ],
                    [
                        'kanji' => '彼女は魚です。',
                        'furigana' => 'かのじょはさかなです。',
                        'romaji' => 'Kanojo wa sakana desu.',
                        'arti' => 'Dia adalah ikan.'
                    ],
                    [
                        'kanji' => '彼女は花を飲みます。',
                        'furigana' => 'かのじょははなをのみます。',
                        'romaji' => 'Kanojo wa hana o nomimasu.',
                        'arti' => 'Dia minum bunga.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-004: namae
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menanyakan nama seseorang.',
                'opsi' => [
                    [
                        'kanji' => 'あなたの名前は何ですか。',
                        'furigana' => 'あなたのなまえはなんですか。',
                        'romaji' => 'Anata no namae wa nan desu ka?',
                        'arti' => 'Siapa nama Anda?'
                    ],
                    [
                        'kanji' => 'あなたの魚は何ですか。',
                        'furigana' => 'あなたのさかなはなんですか。',
                        'romaji' => 'Anata no sakana wa nan desu ka?',
                        'arti' => 'Apa ikan Anda?'
                    ],
                    [
                        'kanji' => 'あなたの山は何ですか。',
                        'furigana' => 'あなたのやまはなんですか。',
                        'romaji' => 'Anata no yama wa nan desu ka?',
                        'arti' => 'Apa gunung Anda?'
                    ],
                    [
                        'kanji' => 'あなたの空は何ですか。',
                        'furigana' => 'あなたのそらはなんですか。',
                        'romaji' => 'Anata no sora wa nan desu ka?',
                        'arti' => 'Apa langit Anda?'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk memperkenalkan nama sendiri.',
                'opsi' => [
                    [
                        'kanji' => '私の名前は佐藤です。',
                        'furigana' => 'わたしのなまえはさとうです。',
                        'romaji' => 'Watashi no namae wa Satou desu.',
                        'arti' => 'Nama saya Satou.'
                    ],
                    [
                        'kanji' => '私の名前は魚です。',
                        'furigana' => 'わたしのなまえはさかなです。',
                        'romaji' => 'Watashi no namae wa sakana desu.',
                        'arti' => 'Nama saya ikan.'
                    ],
                    [
                        'kanji' => '私の名前は山です。',
                        'furigana' => 'わたしのなまえはやまです。',
                        'romaji' => 'Watashi no namae wa yama desu.',
                        'arti' => 'Nama saya gunung.'
                    ],
                    [
                        'kanji' => '私の名前は空です。',
                        'furigana' => 'わたしのなまえはそらです。',
                        'romaji' => 'Watashi no namae wa sora desu.',
                        'arti' => 'Nama saya langit.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-005: jikan
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menanyakan waktu saat ini.',
                'opsi' => [
                    [
                        'kanji' => '今何時ですか。',
                        'furigana' => 'いまなんじですか。',
                        'romaji' => 'Ima nanji desu ka?',
                        'arti' => 'Sekarang jam berapa?'
                    ],
                    [
                        'kanji' => '今何山ですか。',
                        'furigana' => 'いまなにやまですか。',
                        'romaji' => 'Ima nani yama desu ka?',
                        'arti' => 'Sekarang gunung apa?'
                    ],
                    [
                        'kanji' => '今何魚ですか。',
                        'furigana' => 'いまなにさかなですか。',
                        'romaji' => 'Ima nani sakana desu ka?',
                        'arti' => 'Sekarang ikan apa?'
                    ],
                    [
                        'kanji' => '今何花ですか。',
                        'furigana' => 'いまなにはなですか。',
                        'romaji' => 'Ima nani hana desu ka?',
                        'arti' => 'Sekarang bunga apa?'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk mengingatkan pentingnya waktu.',
                'opsi' => [
                    [
                        'kanji' => '時間を守りましょう。',
                        'furigana' => 'じかんをまもりましょう。',
                        'romaji' => 'Jikan o mamorimashou.',
                        'arti' => 'Mari kita jaga waktu.'
                    ],
                    [
                        'kanji' => '魚を守りましょう。',
                        'furigana' => 'さかなをまもりましょう。',
                        'romaji' => 'Sakana o mamorimashou.',
                        'arti' => 'Mari kita jaga ikan.'
                    ],
                    [
                        'kanji' => '山を守りましょう。',
                        'furigana' => 'やまをまもりましょう。',
                        'romaji' => 'Yama o mamorimashou.',
                        'arti' => 'Mari kita jaga gunung.'
                    ],
                    [
                        'kanji' => '花を守りましょう。',
                        'furigana' => 'はなをまもりましょう。',
                        'romaji' => 'Hana o mamorimashou.',
                        'arti' => 'Mari kita jaga bunga.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-006: taberu
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk menyatakan kegiatan makan.',
                'opsi' => [
                    [
                        'kanji' => '私はご飯を食べます。',
                        'furigana' => 'わたしはごはんをたべます。',
                        'romaji' => 'Watashi wa gohan o tabemasu.',
                        'arti' => 'Saya makan nasi.'
                    ],
                    [
                        'kanji' => '私は本を食べます。',
                        'furigana' => 'わたしはほんをたべます。',
                        'romaji' => 'Watashi wa hon o tabemasu.',
                        'arti' => 'Saya makan buku.'
                    ],
                    [
                        'kanji' => '私は水を食べます。',
                        'furigana' => 'わたしはみずをたべます。',
                        'romaji' => 'Watashi wa mizu o tabemasu.',
                        'arti' => 'Saya makan air.'
                    ],
                    [
                        'kanji' => '私はペンを食べます。',
                        'furigana' => 'わたしはぺんをたべます。',
                        'romaji' => 'Watashi wa pen o tabemasu.',
                        'arti' => 'Saya makan pena.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menyatakan suka makan pagi.',
                'opsi' => [
                    [
                        'kanji' => '私は朝ごはんを食べるのが好きです。',
                        'furigana' => 'わたしはあさごはんをたべるのがすきです。',
                        'romaji' => 'Watashi wa asagohan o taberu no ga suki desu.',
                        'arti' => 'Saya suka makan sarapan pagi.'
                    ],
                    [
                        'kanji' => '私は山を食べるのが好きです。',
                        'furigana' => 'わたしはやまをたべるのがすきです。',
                        'romaji' => 'Watashi wa yama o taberu no ga suki desu.',
                        'arti' => 'Saya suka makan gunung.'
                    ],
                    [
                        'kanji' => '私は空を食べるのが好きです。',
                        'furigana' => 'わたしはそらをたべるのがすきです。',
                        'romaji' => 'Watashi wa sora o taberu no ga suki desu.',
                        'arti' => 'Saya suka makan langit.'
                    ],
                    [
                        'kanji' => '私は魚を食べるのが好きです。',
                        'furigana' => 'わたしはさかなをたべるのがすきです。',
                        'romaji' => 'Watashi wa sakana o taberu no ga suki desu.',
                        'arti' => 'Saya suka makan ikan.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-007: iku
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menanyakan waktu saat ini.',
                'opsi' => [
                    [
                        'kanji' => '今何時ですか。',
                        'furigana' => 'いまなんじですか。',
                        'romaji' => 'Ima nanji desu ka?',
                        'arti' => 'Sekarang jam berapa?'
                    ],
                    [
                        'kanji' => '今何山ですか。',
                        'furigana' => 'いまなにやまですか。',
                        'romaji' => 'Ima nani yama desu ka?',
                        'arti' => 'Sekarang gunung apa?'
                    ],
                    [
                        'kanji' => '今何魚ですか。',
                        'furigana' => 'いまなにさかなですか。',
                        'romaji' => 'Ima nani sakana desu ka?',
                        'arti' => 'Sekarang ikan apa?'
                    ],
                    [
                        'kanji' => '今何花ですか。',
                        'furigana' => 'いまなにはなですか。',
                        'romaji' => 'Ima nani hana desu ka?',
                        'arti' => 'Sekarang bunga apa?'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk mengingatkan pentingnya waktu.',
                'opsi' => [
                    [
                        'kanji' => '時間を守りましょう。',
                        'furigana' => 'じかんをまもりましょう。',
                        'romaji' => 'Jikan o mamorimashou.',
                        'arti' => 'Mari kita jaga waktu.'
                    ],
                    [
                        'kanji' => '魚を守りましょう。',
                        'furigana' => 'さかなをまもりましょう。',
                        'romaji' => 'Sakana o mamorimashou.',
                        'arti' => 'Mari kita jaga ikan.'
                    ],
                    [
                        'kanji' => '山を守りましょう。',
                        'furigana' => 'やまをまもりましょう。',
                        'romaji' => 'Yama o mamorimashou.',
                        'arti' => 'Mari kita jaga gunung.'
                    ],
                    [
                        'kanji' => '花を守りましょう。',
                        'furigana' => 'はなをまもりましょう。',
                        'romaji' => 'Hana o mamorimashou.',
                        'arti' => 'Mari kita jaga bunga.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-008: miru
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menanyakan waktu saat ini.',
                'opsi' => [
                    [
                        'kanji' => '今何時ですか。',
                        'furigana' => 'いまなんじですか。',
                        'romaji' => 'Ima nanji desu ka?',
                        'arti' => 'Sekarang jam berapa?'
                    ],
                    [
                        'kanji' => '今何山ですか。',
                        'furigana' => 'いまなにやまですか。',
                        'romaji' => 'Ima nani yama desu ka?',
                        'arti' => 'Sekarang gunung apa?'
                    ],
                    [
                        'kanji' => '今何魚ですか。',
                        'furigana' => 'いまなにさかなですか。',
                        'romaji' => 'Ima nani sakana desu ka?',
                        'arti' => 'Sekarang ikan apa?'
                    ],
                    [
                        'kanji' => '今何花ですか。',
                        'furigana' => 'いまなにはなですか。',
                        'romaji' => 'Ima nani hana desu ka?',
                        'arti' => 'Sekarang bunga apa?'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk mengingatkan pentingnya waktu.',
                'opsi' => [
                    [
                        'kanji' => '時間を守りましょう。',
                        'furigana' => 'じかんをまもりましょう。',
                        'romaji' => 'Jikan o mamorimashou.',
                        'arti' => 'Mari kita jaga waktu.'
                    ],
                    [
                        'kanji' => '魚を守りましょう。',
                        'furigana' => 'さかなをまもりましょう。',
                        'romaji' => 'Sakana o mamorimashou.',
                        'arti' => 'Mari kita jaga ikan.'
                    ],
                    [
                        'kanji' => '山を守りましょう。',
                        'furigana' => 'やまをまもりましょう。',
                        'romaji' => 'Yama o mamorimashou.',
                        'arti' => 'Mari kita jaga gunung.'
                    ],
                    [
                        'kanji' => '花を守りましょう。',
                        'furigana' => 'はなをまもりましょう。',
                        'romaji' => 'Hana o mamorimashou.',
                        'arti' => 'Mari kita jaga bunga.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-009: kuru
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menanyakan waktu saat ini.',
                'opsi' => [
                    [
                        'kanji' => '今何時ですか。',
                        'furigana' => 'いまなんじですか。',
                        'romaji' => 'Ima nanji desu ka?',
                        'arti' => 'Sekarang jam berapa?'
                    ],
                    [
                        'kanji' => '今何山ですか。',
                        'furigana' => 'いまなにやまですか。',
                        'romaji' => 'Ima nani yama desu ka?',
                        'arti' => 'Sekarang gunung apa?'
                    ],
                    [
                        'kanji' => '今何魚ですか。',
                        'furigana' => 'いまなにさかなですか。',
                        'romaji' => 'Ima nani sakana desu ka?',
                        'arti' => 'Sekarang ikan apa?'
                    ],
                    [
                        'kanji' => '今何花ですか。',
                        'furigana' => 'いまなにはなですか。',
                        'romaji' => 'Ima nani hana desu ka?',
                        'arti' => 'Sekarang bunga apa?'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk mengingatkan pentingnya waktu.',
                'opsi' => [
                    [
                        'kanji' => '時間を守りましょう。',
                        'furigana' => 'じかんをまもりましょう。',
                        'romaji' => 'Jikan o mamorimashou.',
                        'arti' => 'Mari kita jaga waktu.'
                    ],
                    [
                        'kanji' => '魚を守りましょう。',
                        'furigana' => 'さかなをまもりましょう。',
                        'romaji' => 'Sakana o mamorimashou.',
                        'arti' => 'Mari kita jaga ikan.'
                    ],
                    [
                        'kanji' => '山を守りましょう。',
                        'furigana' => 'やまをまもりましょう。',
                        'romaji' => 'Yama o mamorimashou.',
                        'arti' => 'Mari kita jaga gunung.'
                    ],
                    [
                        'kanji' => '花を守りましょう。',
                        'furigana' => 'はなをまもりましょう。',
                        'romaji' => 'Hana o mamorimashou.',
                        'arti' => 'Mari kita jaga bunga.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-010: suru
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menanyakan waktu saat ini.',
                'opsi' => [
                    [
                        'kanji' => '今何時ですか。',
                        'furigana' => 'いまなんじですか。',
                        'romaji' => 'Ima nanji desu ka?',
                        'arti' => 'Sekarang jam berapa?'
                    ],
                    [
                        'kanji' => '今何山ですか。',
                        'furigana' => 'いまなにやまですか。',
                        'romaji' => 'Ima nani yama desu ka?',
                        'arti' => 'Sekarang gunung apa?'
                    ],
                    [
                        'kanji' => '今何魚ですか。',
                        'furigana' => 'いまなにさかなですか。',
                        'romaji' => 'Ima nani sakana desu ka?',
                        'arti' => 'Sekarang ikan apa?'
                    ],
                    [
                        'kanji' => '今何花ですか。',
                        'furigana' => 'いまなにはなですか。',
                        'romaji' => 'Ima nani hana desu ka?',
                        'arti' => 'Sekarang bunga apa?'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk mengingatkan pentingnya waktu.',
                'opsi' => [
                    [
                        'kanji' => '時間を守りましょう。',
                        'furigana' => 'じかんをまもりましょう。',
                        'romaji' => 'Jikan o mamorimashou.',
                        'arti' => 'Mari kita jaga waktu.'
                    ],
                    [
                        'kanji' => '魚を守りましょう。',
                        'furigana' => 'さかなをまもりましょう。',
                        'romaji' => 'Sakana o mamorimashou.',
                        'arti' => 'Mari kita jaga ikan.'
                    ],
                    [
                        'kanji' => '山を守りましょう。',
                        'furigana' => 'やまをまもりましょう。',
                        'romaji' => 'Yama o mamorimashou.',
                        'arti' => 'Mari kita jaga gunung.'
                    ],
                    [
                        'kanji' => '花を守りましょう。',
                        'furigana' => 'はなをまもりましょう。',
                        'romaji' => 'Hana o mamorimashou.',
                        'arti' => 'Mari kita jaga bunga.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-011: yama
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menanyakan waktu saat ini.',
                'opsi' => [
                    [
                        'kanji' => '今何時ですか。',
                        'furigana' => 'いまなんじですか。',
                        'romaji' => 'Ima nanji desu ka?',
                        'arti' => 'Sekarang jam berapa?'
                    ],
                    [
                        'kanji' => '今何山ですか。',
                        'furigana' => 'いまなにやまですか。',
                        'romaji' => 'Ima nani yama desu ka?',
                        'arti' => 'Sekarang gunung apa?'
                    ],
                    [
                        'kanji' => '今何魚ですか。',
                        'furigana' => 'いまなにさかなですか。',
                        'romaji' => 'Ima nani sakana desu ka?',
                        'arti' => 'Sekarang ikan apa?'
                    ],
                    [
                        'kanji' => '今何花ですか。',
                        'furigana' => 'いまなにはなですか。',
                        'romaji' => 'Ima nani hana desu ka?',
                        'arti' => 'Sekarang bunga apa?'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk mengingatkan pentingnya waktu.',
                'opsi' => [
                    [
                        'kanji' => '時間を守りましょう。',
                        'furigana' => 'じかんをまもりましょう。',
                        'romaji' => 'Jikan o mamorimashou.',
                        'arti' => 'Mari kita jaga waktu.'
                    ],
                    [
                        'kanji' => '魚を守りましょう。',
                        'furigana' => 'さかなをまもりましょう。',
                        'romaji' => 'Sakana o mamorimashou.',
                        'arti' => 'Mari kita jaga ikan.'
                    ],
                    [
                        'kanji' => '山を守りましょう。',
                        'furigana' => 'やまをまもりましょう。',
                        'romaji' => 'Yama o mamorimashou.',
                        'arti' => 'Mari kita jaga gunung.'
                    ],
                    [
                        'kanji' => '花を守りましょう。',
                        'furigana' => 'はなをまもりましょう。',
                        'romaji' => 'Hana o mamorimashou.',
                        'arti' => 'Mari kita jaga bunga.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-012: kawa
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menanyakan waktu saat ini.',
                'opsi' => [
                    [
                        'kanji' => '今何時ですか。',
                        'furigana' => 'いまなんじですか。',
                        'romaji' => 'Ima nanji desu ka?',
                        'arti' => 'Sekarang jam berapa?'
                    ],
                    [
                        'kanji' => '今何山ですか。',
                        'furigana' => 'いまなにやまですか。',
                        'romaji' => 'Ima nani yama desu ka?',
                        'arti' => 'Sekarang gunung apa?'
                    ],
                    [
                        'kanji' => '今何魚ですか。',
                        'furigana' => 'いまなにさかなですか。',
                        'romaji' => 'Ima nani sakana desu ka?',
                        'arti' => 'Sekarang ikan apa?'
                    ],
                    [
                        'kanji' => '今何花ですか。',
                        'furigana' => 'いまなにはなですか。',
                        'romaji' => 'Ima nani hana desu ka?',
                        'arti' => 'Sekarang bunga apa?'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk mengingatkan pentingnya waktu.',
                'opsi' => [
                    [
                        'kanji' => '時間を守りましょう。',
                        'furigana' => 'じかんをまもりましょう。',
                        'romaji' => 'Jikan o mamorimashou.',
                        'arti' => 'Mari kita jaga waktu.'
                    ],
                    [
                        'kanji' => '魚を守りましょう。',
                        'furigana' => 'さかなをまもりましょう。',
                        'romaji' => 'Sakana o mamorimashou.',
                        'arti' => 'Mari kita jaga ikan.'
                    ],
                    [
                        'kanji' => '山を守りましょう。',
                        'furigana' => 'やまをまもりましょう。',
                        'romaji' => 'Yama o mamorimashou.',
                        'arti' => 'Mari kita jaga gunung.'
                    ],
                    [
                        'kanji' => '花を守りましょう。',
                        'furigana' => 'はなをまもりましょう。',
                        'romaji' => 'Hana o mamorimashou.',
                        'arti' => 'Mari kita jaga bunga.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-013: sora
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menanyakan waktu saat ini.',
                'opsi' => [
                    [
                        'kanji' => '今何時ですか。',
                        'furigana' => 'いまなんじですか。',
                        'romaji' => 'Ima nanji desu ka?',
                        'arti' => 'Sekarang jam berapa?'
                    ],
                    [
                        'kanji' => '今何山ですか。',
                        'furigana' => 'いまなにやまですか。',
                        'romaji' => 'Ima nani yama desu ka?',
                        'arti' => 'Sekarang gunung apa?'
                    ],
                    [
                        'kanji' => '今何魚ですか。',
                        'furigana' => 'いまなにさかなですか。',
                        'romaji' => 'Ima nani sakana desu ka?',
                        'arti' => 'Sekarang ikan apa?'
                    ],
                    [
                        'kanji' => '今何花ですか。',
                        'furigana' => 'いまなにはなですか。',
                        'romaji' => 'Ima nani hana desu ka?',
                        'arti' => 'Sekarang bunga apa?'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk mengingatkan pentingnya waktu.',
                'opsi' => [
                    [
                        'kanji' => '時間を守りましょう。',
                        'furigana' => 'じかんをまもりましょう。',
                        'romaji' => 'Jikan o mamorimashou.',
                        'arti' => 'Mari kita jaga waktu.'
                    ],
                    [
                        'kanji' => '魚を守りましょう。',
                        'furigana' => 'さかなをまもりましょう。',
                        'romaji' => 'Sakana o mamorimashou.',
                        'arti' => 'Mari kita jaga ikan.'
                    ],
                    [
                        'kanji' => '山を守りましょう。',
                        'furigana' => 'やまをまもりましょう。',
                        'romaji' => 'Yama o mamorimashou.',
                        'arti' => 'Mari kita jaga gunung.'
                    ],
                    [
                        'kanji' => '花を守りましょう。',
                        'furigana' => 'はなをまもりましょう。',
                        'romaji' => 'Hana o mamorimashou.',
                        'arti' => 'Mari kita jaga bunga.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-014: hana
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menanyakan waktu saat ini.',
                'opsi' => [
                    [
                        'kanji' => '今何時ですか。',
                        'furigana' => 'いまなんじですか。',
                        'romaji' => 'Ima nanji desu ka?',
                        'arti' => 'Sekarang jam berapa?'
                    ],
                    [
                        'kanji' => '今何山ですか。',
                        'furigana' => 'いまなにやまですか。',
                        'romaji' => 'Ima nani yama desu ka?',
                        'arti' => 'Sekarang gunung apa?'
                    ],
                    [
                        'kanji' => '今何魚ですか。',
                        'furigana' => 'いまなにさかなですか。',
                        'romaji' => 'Ima nani sakana desu ka?',
                        'arti' => 'Sekarang ikan apa?'
                    ],
                    [
                        'kanji' => '今何花ですか。',
                        'furigana' => 'いまなにはなですか。',
                        'romaji' => 'Ima nani hana desu ka?',
                        'arti' => 'Sekarang bunga apa?'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk mengingatkan pentingnya waktu.',
                'opsi' => [
                    [
                        'kanji' => '時間を守りましょう。',
                        'furigana' => 'じかんをまもりましょう。',
                        'romaji' => 'Jikan o mamorimashou.',
                        'arti' => 'Mari kita jaga waktu.'
                    ],
                    [
                        'kanji' => '魚を守りましょう。',
                        'furigana' => 'さかなをまもりましょう。',
                        'romaji' => 'Sakana o mamorimashou.',
                        'arti' => 'Mari kita jaga ikan.'
                    ],
                    [
                        'kanji' => '山を守りましょう。',
                        'furigana' => 'やまをまもりましょう。',
                        'romaji' => 'Yama o mamorimashou.',
                        'arti' => 'Mari kita jaga gunung.'
                    ],
                    [
                        'kanji' => '花を守りましょう。',
                        'furigana' => 'はなをまもりましょう。',
                        'romaji' => 'Hana o mamorimashou.',
                        'arti' => 'Mari kita jaga bunga.'
                    ],
                ],
                'jawaban' => 'a',
            ],
            // KOSA-015: sakana
            [
                'soal_arti' => 'Pilih kalimat yang paling tepat untuk menanyakan waktu saat ini.',
                'opsi' => [
                    [
                        'kanji' => '今何時ですか。',
                        'furigana' => 'いまなんじですか。',
                        'romaji' => 'Ima nanji desu ka?',
                        'arti' => 'Sekarang jam berapa?'
                    ],
                    [
                        'kanji' => '今何山ですか。',
                        'furigana' => 'いまなにやまですか。',
                        'romaji' => 'Ima nani yama desu ka?',
                        'arti' => 'Sekarang gunung apa?'
                    ],
                    [
                        'kanji' => '今何魚ですか。',
                        'furigana' => 'いまなにさかなですか。',
                        'romaji' => 'Ima nani sakana desu ka?',
                        'arti' => 'Sekarang ikan apa?'
                    ],
                    [
                        'kanji' => '今何花ですか。',
                        'furigana' => 'いまなにはなですか。',
                        'romaji' => 'Ima nani hana desu ka?',
                        'arti' => 'Sekarang bunga apa?'
                    ],
                ],
                'jawaban' => 'a',
            ],
            [
                'soal_arti' => 'Pilih kalimat yang paling natural untuk mengingatkan pentingnya waktu.',
                'opsi' => [
                    [
                        'kanji' => '時間を守りましょう。',
                        'furigana' => 'じかんをまもりましょう。',
                        'romaji' => 'Jikan o mamorimashou.',
                        'arti' => 'Mari kita jaga waktu.'
                    ],
                    [
                        'kanji' => '魚を守りましょう。',
                        'furigana' => 'さかなをまもりましょう。',
                        'romaji' => 'Sakana o mamorimashou.',
                        'arti' => 'Mari kita jaga ikan.'
                    ],
                    [
                        'kanji' => '山を守りましょう。',
                        'furigana' => 'やまをまもりましょう。',
                        'romaji' => 'Yama o mamorimashou.',
                        'arti' => 'Mari kita jaga gunung.'
                    ],
                    [
                        'kanji' => '花を守りましょう。',
                        'furigana' => 'はなをまもりましょう。',
                        'romaji' => 'Hana o mamorimashou.',
                        'arti' => 'Mari kita jaga bunga.'
                    ],
                ],
                'jawaban' => 'a',
            ],
        ];
        $kosakataIds = array_column($kosakatas, 'id');
        for ($i = 0; $i < count($kosakataIds); $i++) {
            $kosaId = $kosakataIds[$i];
            for ($j = 0; $j < 2; $j++) {
                $idx = $i * 2 + $j;
                $q = $advancedQuestions[$idx];
                SoalKosakata::create([
                    'kosakata_id' => $kosaId,
                    'level' => 'advanced',
                    'soal_kanji' => '',
                    'soal_furigana' => '',
                    'soal_romaji' => '',
                    'soal_arti' => $q['soal_arti'],
                    'opsi_a_kanji' => $q['opsi'][0]['kanji'],
                    'opsi_a_furigana' => $q['opsi'][0]['furigana'],
                    'opsi_a_romaji' => $q['opsi'][0]['romaji'],
                    'opsi_a_arti' => $q['opsi'][0]['arti'],
                    'opsi_b_kanji' => $q['opsi'][1]['kanji'],
                    'opsi_b_furigana' => $q['opsi'][1]['furigana'],
                    'opsi_b_romaji' => $q['opsi'][1]['romaji'],
                    'opsi_b_arti' => $q['opsi'][1]['arti'],
                    'opsi_c_kanji' => $q['opsi'][2]['kanji'],
                    'opsi_c_furigana' => $q['opsi'][2]['furigana'],
                    'opsi_c_romaji' => $q['opsi'][2]['romaji'],
                    'opsi_c_arti' => $q['opsi'][2]['arti'],
                    'opsi_d_kanji' => $q['opsi'][3]['kanji'],
                    'opsi_d_furigana' => $q['opsi'][3]['furigana'],
                    'opsi_d_romaji' => $q['opsi'][3]['romaji'],
                    'opsi_d_arti' => $q['opsi'][3]['arti'],
                    'jawaban_benar' => $q['jawaban'],
                ]);
            }
        }
// ================= END SOAL ADVANCED =================
    }
}
