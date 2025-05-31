<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuisHurufSessionSoal extends Model
{
    use HasFactory;

    protected $table = 'quis_huruf_session_soals';
    protected $fillable = ['id_user', 'session_id', 'soal_id', 'user_answer', 'is_correct', 'attempt', 'exp'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function session()
    {
        return $this->belongsTo(QuisHurufSession::class, 'session_id');
    }

    public function soal()
    {
        return $this->belongsTo(SoalQuisHuruf::class, 'soal_id');
    }
}
