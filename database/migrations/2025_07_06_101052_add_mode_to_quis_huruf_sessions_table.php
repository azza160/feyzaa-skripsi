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
        Schema::table('quis_huruf_sessions', function (Blueprint $table) {
            $table->enum('mode', ['manual', 'random'])->default('manual')->after('jenis_huruf');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quis_huruf_sessions', function (Blueprint $table) {
            $table->dropColumn('mode');
        });
    }
};
