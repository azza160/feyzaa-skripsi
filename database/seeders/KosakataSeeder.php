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

            //watashi 1
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

            //Arigatou 2
          [
    'id' => 'KOSA-002',
    'kanji' => 'ありがとうございます',
    'furigana' => 'ありがとうございます',
    'romaji' => 'arigatou gozaimasu',
    'arti' => 'terima kasih (dengan sopan)',
    'deskripsi' => 'Ungkapan terima kasih yang digunakan dalam situasi formal dan sopan dalam bahasa Jepang. ' . 
                   'Sering dipakai kepada orang yang dihormati, dalam pelayanan pelanggan, atau saat menyatakan rasa terima kasih dengan hormat. ' .
                   'Bentuk ini menunjukkan kesopanan lebih tinggi dibandingkan "arigatou" biasa.',
    'catatan' => 'Digunakan dalam hampir semua situasi formal dan sopan, serta dalam bisnis atau interaksi dengan orang yang kurang dikenal.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754803666/ttsMP3.com_VoiceText_2025-8-10_12-27-25_oka3gd.mp3',
],

            //kore 3
 [
    'id' => 'KOSA-003',
    'kanji' => 'これ',
    'furigana' => 'これ',
    'romaji' => 'kore',
    'arti' => 'ini',
    'deskripsi' => 'Kata ganti demonstratif yang digunakan untuk menunjukkan benda atau hal yang dekat dengan pembicara. Biasanya dipakai ketika menunjuk sesuatu yang ada di dekat diri sendiri.',
    'catatan' => 'Digunakan untuk benda yang dekat pembicara, berbeda dengan それ (sore) untuk benda dekat lawan bicara, dan あれ (are) untuk benda yang jauh dari keduanya.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754805137/ttsMP3.com_VoiceText_2025-8-10_12-51-46_fgnuok.mp3',
],
            //sore 4
            [
    'id' => 'KOSA-004',
    'kanji' => 'それ',
    'furigana' => 'それ',
    'romaji' => 'sore',
    'arti' => 'itu',
    'deskripsi' => 'Kata ganti demonstratif yang digunakan untuk menunjukkan benda atau hal yang dekat dengan lawan bicara. Biasanya dipakai ketika menunjuk sesuatu yang ada dekat dengan orang yang diajak bicara.',
    'catatan' => 'Berbeda dengan これ (kore) yang dekat dengan pembicara dan あれ (are) yang jauh dari pembicara dan lawan bicara.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754807590/ttsMP3.com_VoiceText_2025-8-10_13-32-31_rd48hk.mp3',
],

            //are 5
[
    'id' => 'KOSA-005',
    'kanji' => 'あれ',
    'furigana' => 'あれ',
    'romaji' => 'are',
    'arti' => 'itu (yang jauh)',
    'deskripsi' => 'Kata ganti demonstratif yang digunakan untuk menunjukkan benda atau hal yang jauh dari pembicara dan lawan bicara. ' .
                   'Digunakan ketika menunjuk sesuatu yang tidak dekat dengan siapa pun dalam percakapan.',
    'catatan' => 'Berbeda dengan これ (kore) yang dekat pembicara, dan それ (sore) yang dekat lawan bicara. ' .
                 'Umumnya digunakan untuk menunjuk benda yang berada jauh secara fisik.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754809753/ttsMP3.com_VoiceText_2025-8-10_14-8-48_hqqyus.mp3',
],


            // nomu 6
            [
    'id' => 'KOSA-006',
    'kanji' => '飲みます',
    'furigana' => 'のみます',
    'romaji' => 'nomimasu',
    'arti' => 'minum',
    'deskripsi' => 'Kata kerja bentuk sopan yang berarti "minum". Digunakan untuk menyatakan tindakan meminum sesuatu, seperti air, teh, kopi, atau obat.',
    'catatan' => 'Bentuk dasar kata kerja adalah 飲む (のむ, nomu). Bentuk "のみます" adalah bentuk -masu yang sopan dan umum dipakai dalam percakapan formal atau sehari-hari.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754811316/ttsMP3.com_VoiceText_2025-8-10_14-30-30_qonrh5.mp3',
],

            // iku 7
            [
    'id' => 'KOSA-007',
    'kanji' => '行きます',
    'furigana' => 'いきます',
    'romaji' => 'ikimasu',
    'arti' => 'pergi',
    'deskripsi' => 'Kata kerja bentuk sopan yang berarti "pergi". Digunakan untuk menyatakan tindakan menuju atau pergi ke suatu tempat.',
    'catatan' => 'Bentuk dasar kata kerja adalah 行く (いく, iku). Bentuk "いきます" adalah bentuk -masu yang sopan dan umum dipakai dalam percakapan formal atau sehari-hari.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754812864/ttsMP3.com_VoiceText_2025-8-10_15-0-39_f5qi09.mp3',
],

            // kuru 8
         [
    'id' => 'KOSA-008',
    'kanji' => '来ます',
    'furigana' => 'きます',
    'romaji' => 'kimasu',
    'arti' => 'datang',
    'deskripsi' => 'Kata kerja bentuk sopan yang berarti "datang". Digunakan untuk menyatakan tindakan menuju ke tempat pembicara atau titik acuan tertentu.',
    'catatan' => 'Bentuk dasar kata kerja adalah 来る (くる, kuru). Bentuk "きます" adalah bentuk -masu yang sopan dan umum dipakai dalam percakapan formal atau sehari-hari.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754814672/ttsMP3.com_VoiceText_2025-8-10_15-30-4_flotwx.mp3',
],
            // miru 9
                 [
    'id' => 'KOSA-009',
    'kanji' => '見ます',
    'furigana' => 'みます',
    'romaji' => 'mimasu',
    'arti' => 'melihat',
    'deskripsi' => 'Kata kerja bentuk sopan yang berarti "melihat" atau "menonton". Digunakan untuk menyatakan tindakan melihat sesuatu dengan sengaja atau menonton acara, film, atau objek.',
    'catatan' => 'Bentuk dasar kata kerja adalah 見る (みる, miru). Bentuk "みます" adalah bentuk -masu yang sopan dan umum dipakai dalam percakapan formal atau sehari-hari.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754816569/ttsMP3.com_VoiceText_2025-8-10_16-2-12_hxbzca.mp3',
],
 
            // hon 10
            [
    'id' => 'KOSA-010',
    'kanji' => '本',
    'furigana' => 'ほん',
    'romaji' => 'hon',
    'arti' => 'buku',
    'deskripsi' => 'Kata benda yang berarti "buku". Digunakan untuk menyebut benda berupa buku secara umum dalam bahasa Jepang.',
    'catatan' => 'Kata ini juga dapat digunakan sebagai pengukur benda panjang seperti pensil, botol, dan lain-lain, tergantung konteks kalimat.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754817986/ttsMP3.com_VoiceText_2025-8-10_16-25-57_1_ujiceh.mp3',
],

    



        ]);
    }
}
