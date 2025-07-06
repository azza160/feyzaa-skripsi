<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class QuisHurufSession extends Model
{
    use HasFactory;
    
    protected $table = 'quis_huruf_sessions';
    protected $primaryKey = 'id';
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $fillable = [
        'id_user', 
        'level', 
        'jenis_huruf', 
        'mode',
        'waktu_max', 
        'started_at', 
        'ended_at', 
        'total_exp', 
        'total_benar',
        'selected_soals',
        'user_answers'
    ];
    
    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'selected_soals' => 'array',
        'user_answers' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::ulid();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    // Removed sessionSoals relationship - no longer needed with JSON-based tracking
    
    // Helper method to check if session is active
    public function isActive()
    {
        return $this->ended_at === null;
    }
    
    // Helper method to check if session is completed
    public function isCompleted()
    {
        return $this->ended_at !== null;
    }
}
