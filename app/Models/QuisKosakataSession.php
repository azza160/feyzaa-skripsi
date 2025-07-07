<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuisKosakataSession extends Model
{
    use HasFactory;

    protected $table = 'quis_kosakata_sessions';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'user_id', 'mode', 'level', 'selected_kosakata', 'selected_soal', 'user_answers',
        'started_at', 'ended_at', 'ended', 'total_exp'
    ];

    protected $casts = [
        'selected_kosakata' => 'array',
        'selected_soal' => 'array',
        'user_answers' => 'array',
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'ended' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
