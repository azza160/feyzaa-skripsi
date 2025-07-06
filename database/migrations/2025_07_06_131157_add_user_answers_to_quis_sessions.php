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
            $table->json('user_answers')->nullable()->after('selected_soals');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quis_huruf_sessions', function (Blueprint $table) {
            $table->dropColumn('user_answers');
        });
    }
};
