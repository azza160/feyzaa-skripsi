<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SoalQuisHuruf extends Model
{
    use HasFactory;
    protected $table = 'soal_quis_hurufs';
    protected $fillable = ['huruf_id', 'jenis', 'level', 'question', 'character', 'correct_answer', 'option_a', 'option_b', 'option_c', 'option_d'];

    public function huruf()
    {
        return $this->belongsTo(Huruf::class, 'huruf_id');
    }

    // Removed sessionSoals relationship - no longer needed with JSON-based tracking
}
