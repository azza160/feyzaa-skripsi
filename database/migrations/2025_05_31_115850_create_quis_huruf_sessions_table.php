<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('quis_huruf_sessions', function (Blueprint $table) {
            $table->char('id', 26)->primary(); // ULID = char(26) for better security
            $table->char('id_user', 26); // ULID = char(26)
            $table->enum('level', ['beginner', 'intermediate', 'advanced']);
            $table->enum('jenis_huruf', ['hiragana', 'katakana']);
            $table->enum('mode', ['manual', 'random'])->default('manual');
            $table->integer('waktu_max')->nullable(); // dalam detik 
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->integer('total_exp')->default(0);
            $table->integer('total_benar')->default(0);
            $table->json('selected_soals')->nullable(); // Store soal IDs as JSON instead of separate table
            $table->timestamps();
        
            // Foreign key harus dideklarasi terpisah
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            
            // Add indexes for better performance
            $table->index(['id_user', 'ended_at']);
            $table->index(['level', 'jenis_huruf']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quis_huruf_sessions');
    }
};
