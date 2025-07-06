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
        // Drop existing tables (this will cascade to related tables)
        Schema::dropIfExists('quis_huruf_session_soals');
        Schema::dropIfExists('quis_huruf_sessions');
        
        // Recreate tables with new ULID structure
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
        
        Schema::create('quis_huruf_session_soals', function (Blueprint $table) {
            $table->char('id', 26)->primary(); // ULID for better security
            $table->char('id_user', 26); // ULID
            $table->char('session_id', 26); // ULID
            $table->unsignedBigInteger('soal_id');
        
            $table->string('user_answer')->nullable();
            $table->boolean('is_correct')->default(false);
            $table->integer('attempt')->default(1);
            $table->integer('exp')->default(0);
        
            $table->timestamps();
        
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('session_id')->references('id')->on('quis_huruf_sessions')->onDelete('cascade');
            $table->foreign('soal_id')->references('id')->on('soal_quis_hurufs')->onDelete('cascade');
        
            $table->unique(['session_id', 'soal_id']); // agar satu soal unik per sesi
            
            // Add indexes for better performance
            $table->index(['id_user', 'session_id']);
            $table->index(['soal_id', 'is_correct']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the new tables
        Schema::dropIfExists('quis_huruf_session_soals');
        Schema::dropIfExists('quis_huruf_sessions');
        
        // Recreate original tables (if needed for rollback)
        Schema::create('quis_huruf_sessions', function (Blueprint $table) {
            $table->id();
            $table->char('id_user', 26);
            $table->enum('level', ['beginner', 'intermediate', 'advanced']);
            $table->enum('jenis_huruf', ['hiragana', 'katakana']);
            $table->enum('mode', ['manual', 'random'])->default('manual');
            $table->integer('waktu_max')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->integer('total_exp')->default(0);
            $table->integer('total_benar')->default(0);
            $table->timestamps();
            
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
        });
        
        Schema::create('quis_huruf_session_soals', function (Blueprint $table) {
            $table->id();
            $table->char('id_user', 26);
            $table->unsignedBigInteger('session_id');
            $table->unsignedBigInteger('soal_id');
            $table->string('user_answer')->nullable();
            $table->boolean('is_correct')->default(false);
            $table->integer('attempt')->default(1);
            $table->integer('exp')->default(0);
            $table->timestamps();
            
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('session_id')->references('id')->on('quis_huruf_sessions')->onDelete('cascade');
            $table->foreign('soal_id')->references('id')->on('soal_quis_hurufs')->onDelete('cascade');
            $table->unique(['session_id', 'soal_id']);
        });
    }
};
