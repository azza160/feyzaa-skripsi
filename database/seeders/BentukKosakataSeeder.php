<?php

namespace Database\Seeders;

use App\Models\BentukKosakata;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BentukKosakataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BentukKosakata::insert([
        
            
            //nomimasu
            [
                'id' => 'BENTUK-002',
    'id_kosakata' => 'KOSA-006',
    'bentuk' => 'dasar',
    'kanji' => '飲む',
    'furigana' => 'のむ',
    'romaji' => 'nomu',
    'arti' => 'minum',
    'deskripsi' => 'Kata kerja bentuk dasar yang berarti "minum". Digunakan untuk menyatakan tindakan mengonsumsi cairan seperti air, teh, atau obat dalam situasi santai maupun formal.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754811342/ttsMP3.com_VoiceText_2025-8-10_14-35-14_u1kcfd.mp3',
],

   [
                'id' => 'BENTUK-003',
    'id_kosakata' => 'KOSA-006',
    'bentuk' => 'negatif',
    'kanji' => '飲みません',
    'furigana' => 'のみません',
    'romaji' => 'nomimasen',
    'arti' => 'tidak minum',
    'deskripsi' => 'Bentuk sopan negatif dari kata kerja 飲む yang berarti "tidak minum". Digunakan dalam situasi formal atau ketika berbicara dengan orang yang dihormati.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754811580/ttsMP3.com_VoiceText_2025-8-10_14-39-28_dyt3ug.mp3',
],

  [
                'id' => 'BENTUK-004',
    'id_kosakata' => 'KOSA-007',
    'bentuk' => 'dasar',
    'kanji' => '行く',
    'furigana' => 'いく',
    'romaji' => 'iku',
    'arti' => 'pergi',
    'deskripsi' => 'Kata kerja bentuk dasar yang berarti "pergi". Digunakan untuk menyatakan tindakan pergi atau menuju ke suatu tempat dalam percakapan sehari-hari maupun tulisan.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754812983/ttsMP3.com_VoiceText_2025-8-10_15-2-51_xxqkqe.mp3',
],

 [
                'id' => 'BENTUK-005',
    'id_kosakata' => 'KOSA-007',
    'bentuk' => 'negatif',
    'kanji' => '行きません',
    'furigana' => 'いきません',
    'romaji' => 'ikimasen',
    'arti' => 'tidak pergi',
    'deskripsi' => 'Bentuk sopan negatif dari kata kerja 行く yang berarti "tidak pergi". Digunakan untuk menyatakan penolakan atau ketidakberminatan dalam melakukan tindakan pergi dalam situasi formal atau sopan.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754813155/ttsMP3.com_VoiceText_2025-8-10_15-5-41_thod1v.mp3',
],

[
    'id' => 'BENTUK-006',
    'id_kosakata' => 'KOSA-008',
    'bentuk' => 'dasar',
    'kanji' => '来る',
    'furigana' => 'くる',
    'romaji' => 'kuru',
    'arti' => 'datang',
    'deskripsi' => 'Kata kerja bentuk dasar yang berarti "datang". Digunakan untuk menyatakan tindakan menuju ke tempat pembicara atau titik acuan dalam situasi informal atau dasar.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754814840/ttsMP3.com_VoiceText_2025-8-10_15-33-46_nj1ky7.mp3',
],

[
    'id' => 'BENTUK-007',
    'id_kosakata' => 'KOSA-008',
    'bentuk' => 'negatif',
    'kanji' => '来ません',
    'furigana' => 'きません',
    'romaji' => 'kimasen',
    'arti' => 'tidak datang',
    'deskripsi' => 'Bentuk sopan negatif dari kata kerja 来る yang berarti "tidak datang". Digunakan untuk menyatakan penolakan atau ketidakberminatan dalam tindakan datang dalam situasi formal atau sopan',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754814973/ttsMP3.com_VoiceText_2025-8-10_15-36-1_ramyse.mp3',
],

[
    'id' => 'BENTUK-008',
    'id_kosakata' => 'KOSA-009',
    'bentuk' => 'dasar',
    'kanji' => '見る',
    'furigana' => 'みる',
    'romaji' => 'miru',
    'arti' => 'melihat',
    'deskripsi' => 'Kata kerja bentuk dasar yang berarti "melihat" atau "menonton". Digunakan dalam percakapan sehari-hari dan sebagai dasar pembentukan kata kerja lain seperti bentuk sopan.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754816759/ttsMP3.com_VoiceText_2025-8-10_16-5-40_qy0nfw.mp3',
],

[
    'id' => 'BENTUK-009',
    'id_kosakata' => 'KOSA-009',
    'bentuk' => 'negatif',
    'kanji' => '見ません',
    'furigana' => 'みません',
    'romaji' => 'mimasen',
    'arti' => 'tidak melihat',
    'deskripsi' => 'Bentuk sopan negatif dari kata kerja 見る yang berarti "tidak melihat" atau "tidak menonton". Digunakan untuk menyatakan penolakan atau ketidakberminatan dalam tindakan melihat atau menonton dalam situasi formal.',
    'audio' => 'https://res.cloudinary.com/dzozxilf6/video/upload/v1754816897/ttsMP3.com_VoiceText_2025-8-10_16-8-6_hsqn93.mp3',
],





//end nomimasu
        ]);
    }
}
