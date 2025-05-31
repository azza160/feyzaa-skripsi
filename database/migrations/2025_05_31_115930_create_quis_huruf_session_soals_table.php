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
        Schema::create('quis_huruf_session_soals', function (Blueprint $table) {
            $table->id();
            $table->char('id_user', 26); // ULID
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
        
            $table->unique(['session_id', 'soal_id']); // agar satu soal unik per sesi
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quis_huruf_session_soals');
    }
};
