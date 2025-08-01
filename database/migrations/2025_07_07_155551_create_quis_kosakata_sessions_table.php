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
        Schema::create('quis_kosakata_sessions', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->ulid('user_id');
            $table->enum('mode', ['manual', 'random']);
            $table->enum('level', ['beginner', 'intermediate', 'advanced']);
            $table->json('selected_kosakata')->nullable();
            $table->json('selected_soal')->nullable();
            $table->json('user_answers')->nullable();
            // Tambahkan field soal untuk menyimpan array soal kuis
            $table->json('soal')->nullable();
            $table->integer('remaining_time')->default(300);
            $table->timestamp('started_at');
            $table->timestamp('ended_at')->nullable();
            $table->boolean('ended')->default(false);
            $table->integer('total_exp')->default(0);
            $table->unsignedInteger('review_visit_count')->default(0); // Tambahan: jumlah kunjungan review
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quis_kosakata_sessions');
    }
};
