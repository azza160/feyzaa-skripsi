<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SoalQuisSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $soals = [
            [
                'huruf_id' => 'H-GO-A',
                'question' => 'Bagaimana pelafalan karakter berikut?',
                'character' => 'あ',
                'correct_answer' => 'a',
                'option_a' => 'a',
                'option_b' => 'i',
                'option_c' => 'u',
                'option_d' => 'e',
            ],
            [
                'huruf_id' => 'H-GO-I',
                'question' => 'Bagaimana pelafalan karakter berikut?',
                'character' => 'い',
                'correct_answer' => 'b',
                'option_a' => 'e',
                'option_b' => 'i',
                'option_c' => 'o',
                'option_d' => 'a',
            ],
            [
                'huruf_id' => 'H-GO-U',
                'question' => 'Bagaimana pelafalan karakter berikut?',
                'character' => 'う',
                'correct_answer' => 'a',
                'option_a' => 'u',
                'option_b' => 'o',
                'option_c' => 'i',
                'option_d' => 'a',
            ],
            [
                'huruf_id' => 'H-GO-E',
                'question' => 'Bagaimana pelafalan karakter berikut?',
                'character' => 'え',
                'correct_answer' => 'b',
                'option_a' => 'i',
                'option_b' => 'e',
                'option_c' => 'u',
                'option_d' => 'o',
            ],
            [
                'huruf_id' => 'H-GO-O',
                'question' => 'Bagaimana pelafalan karakter berikut?',
                'character' => 'お',
                'correct_answer' => 'c',
                'option_a' => 'e',
                'option_b' => 'a',
                'option_c' => 'o',
                'option_d' => 'i',
            ],
        ];
    
        foreach ($soals as $soal) {
            DB::table('soal_quis_hurufs')->insert([
                'huruf_id' => $soal['huruf_id'],
                'question' => $soal['question'],
                'jenis' => 'hiragana',
                'level' => 'beginner',
                'character' => $soal['character'],
                'correct_answer' => $soal['correct_answer'],
                'option_a' => $soal['option_a'],
                'option_b' => $soal['option_b'],
                'option_c' => $soal['option_c'],
                'option_d' => $soal['option_d'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
