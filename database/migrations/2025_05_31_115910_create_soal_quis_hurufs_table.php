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
        Schema::create('soal_quis_hurufs', function (Blueprint $table) {
            $table->id(); // INTEGER AUTO_INCREMENT PRIMARY KEY
            $table->string('huruf_id'); // ULID = char(26)
            $table->enum('jenis', ['hiragana', 'katakana']);
            $table->enum('level', ['beginner', 'intermediate', 'advanced']);
            $table->string('question');
            $table->string('character');
            $table->string('correct_answer');
            $table->string('option_a');
            $table->string('option_b');
            $table->string('option_c');
            $table->string('option_d');
            $table->timestamps();
            $table->foreign('huruf_id')->references('id')->on('hurufs')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soal_quis_hurufs');
    }
};
