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
        Schema::create('soal_kosakata', function (Blueprint $table) {
            $table->id();
            $table->string('kosakata_id'); // FK ke kosakatas.id
            $table->enum('level', ['intermediate', 'advanced']);
            $table->text('soal_kanji');
            $table->text('soal_furigana');
            $table->text('soal_romaji');
            $table->text('soal_arti');
            // Opsi A
            $table->string('opsi_a_kanji');
            $table->string('opsi_a_furigana');
            $table->string('opsi_a_romaji');
            $table->string('opsi_a_arti');
            // Opsi B
            $table->string('opsi_b_kanji');
            $table->string('opsi_b_furigana');
            $table->string('opsi_b_romaji');
            $table->string('opsi_b_arti');
            // Opsi C
            $table->string('opsi_c_kanji');
            $table->string('opsi_c_furigana');
            $table->string('opsi_c_romaji');
            $table->string('opsi_c_arti');
            // Opsi D
            $table->string('opsi_d_kanji');
            $table->string('opsi_d_furigana');
            $table->string('opsi_d_romaji');
            $table->string('opsi_d_arti');
            $table->enum('jawaban_benar', ['a', 'b', 'c', 'd']);
            $table->timestamps();
            $table->foreign('kosakata_id')->references('id')->on('kosakatas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soal_kosakata');
    }
};
