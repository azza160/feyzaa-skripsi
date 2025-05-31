<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuisHurufSession extends Model
{
    use HasFactory;
    protected $table = 'quis_huruf_sessions';
    protected $fillable = ['id_user', 'level', 'jenis_huruf', 'waktu_max', 'started_at', 'ended_at', 'total_exp', 'total_benar'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function sessionSoals()
    {
        return $this->hasMany(QuisHurufSessionSoal::class, 'session_id');
    }
}
