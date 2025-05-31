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
            $table->id();
            $table->char('id_user', 26); // ULID = char(26)
            $table->enum('level', ['beginner', 'intermediate', 'advanced']);
            $table->enum('jenis_huruf', ['hiragana', 'katakana']);
            $table->integer('waktu_max')->nullable(); // dalam detik 
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->integer('total_exp')->default(0);
            $table->integer('total_benar')->default(0);
            $table->timestamps();
        
            // Foreign key harus dideklarasi terpisah
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
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
