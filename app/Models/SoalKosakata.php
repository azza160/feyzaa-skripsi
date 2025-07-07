<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoalKosakata extends Model
{
    use HasFactory;

    protected $table = 'soal_kosakata';

    protected $fillable = [
        'kosakata_id', 'level', 'soal_kanji', 'soal_furigana', 'soal_romaji', 'soal_arti',
        'opsi_a_kanji', 'opsi_a_furigana', 'opsi_a_romaji', 'opsi_a_arti',
        'opsi_b_kanji', 'opsi_b_furigana', 'opsi_b_romaji', 'opsi_b_arti',
        'opsi_c_kanji', 'opsi_c_furigana', 'opsi_c_romaji', 'opsi_c_arti',
        'opsi_d_kanji', 'opsi_d_furigana', 'opsi_d_romaji', 'opsi_d_arti',
        'jawaban_benar'
    ];

    public function kosakata()
    {
        return $this->belongsTo(Kosakata::class, 'kosakata_id', 'id');
    }
}
