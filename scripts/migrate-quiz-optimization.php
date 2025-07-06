<?php

/**
 * Safe Migration Script for Quiz System Optimization
 * 
 * This script provides a safe way to migrate the quiz system to use ULID
 * and performance optimizations. It includes backup and rollback functionality.
 */

require_once __DIR__ . '/../vendor/autoload.php';

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class QuizMigrationScript
{
    private $backupTables = [];
    private $migrationLog = [];
    
    public function run()
    {
        echo "=== Quiz System Optimization Migration ===\n\n";
        
        try {
            // Step 1: Check prerequisites
            $this->checkPrerequisites();
            
            // Step 2: Create backup
            $this->createBackup();
            
            // Step 3: Run migration
            $this->runMigration();
            
            // Step 4: Verify migration
            $this->verifyMigration();
            
            echo "\n✅ Migration completed successfully!\n";
            
        } catch (Exception $e) {
            echo "\n❌ Migration failed: " . $e->getMessage() . "\n";
            $this->rollback();
        }
    }
    
    private function checkPrerequisites()
    {
        echo "1. Checking prerequisites...\n";
        
        // Check if tables exist
        if (!Schema::hasTable('quis_huruf_sessions')) {
            throw new Exception('quis_huruf_sessions table does not exist');
        }
        
        if (!Schema::hasTable('quis_huruf_session_soals')) {
            throw new Exception('quis_huruf_session_soals table does not exist');
        }
        
        // Check if we have data to backup
        $sessionCount = DB::table('quis_huruf_sessions')->count();
        $soalCount = DB::table('quis_huruf_session_soals')->count();
        
        echo "   - Found {$sessionCount} quiz sessions\n";
        echo "   - Found {$soalCount} session soals\n";
        
        echo "   ✅ Prerequisites check passed\n\n";
    }
    
    private function createBackup()
    {
        echo "2. Creating backup...\n";
        
        $timestamp = date('Y_m_d_H_i_s');
        
        // Create backup tables
        $this->backupTables['sessions'] = "quis_huruf_sessions_backup_{$timestamp}";
        $this->backupTables['soals'] = "quis_huruf_session_soals_backup_{$timestamp}";
        
        // Backup sessions
        Schema::create($this->backupTables['sessions'], function ($table) {
            $table->id();
            $table->char('id_user', 26);
            $table->enum('level', ['beginner', 'intermediate', 'advanced']);
            $table->enum('jenis_huruf', ['hiragana', 'katakana']);
            $table->integer('waktu_max')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->integer('total_exp')->default(0);
            $table->integer('total_benar')->default(0);
            $table->timestamps();
        });
        
        // Backup soals
        Schema::create($this->backupTables['soals'], function ($table) {
            $table->id();
            $table->char('id_user', 26);
            $table->unsignedBigInteger('session_id');
            $table->unsignedBigInteger('soal_id');
            $table->string('user_answer')->nullable();
            $table->boolean('is_correct')->default(false);
            $table->integer('attempt')->default(1);
            $table->integer('exp')->default(0);
            $table->timestamps();
        });
        
        // Copy data
        DB::statement("INSERT INTO {$this->backupTables['sessions']} SELECT * FROM quis_huruf_sessions");
        DB::statement("INSERT INTO {$this->backupTables['soals']} SELECT * FROM quis_huruf_session_soals");
        
        echo "   ✅ Backup created: {$this->backupTables['sessions']}, {$this->backupTables['soals']}\n\n";
    }
    
    private function runMigration()
    {
        echo "3. Running migration...\n";
        
        // Drop existing tables
        Schema::dropIfExists('quis_huruf_session_soals');
        Schema::dropIfExists('quis_huruf_sessions');
        
        // Create new tables with ULID
        Schema::create('quis_huruf_sessions', function ($table) {
            $table->char('id', 26)->primary();
            $table->char('id_user', 26);
            $table->enum('level', ['beginner', 'intermediate', 'advanced']);
            $table->enum('jenis_huruf', ['hiragana', 'katakana']);
            $table->enum('mode', ['manual', 'random'])->default('manual');
            $table->integer('waktu_max')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('ended_at')->nullable();
            $table->integer('total_exp')->default(0);
            $table->integer('total_benar')->default(0);
            $table->json('selected_soals')->nullable();
            $table->timestamps();
            
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->index(['id_user', 'ended_at']);
            $table->index(['level', 'jenis_huruf']);
        });
        
        Schema::create('quis_huruf_session_soals', function ($table) {
            $table->char('id', 26)->primary();
            $table->char('id_user', 26);
            $table->char('session_id', 26);
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
            $table->index(['id_user', 'session_id']);
            $table->index(['soal_id', 'is_correct']);
        });
        
        echo "   ✅ New tables created with ULID structure\n\n";
    }
    
    private function verifyMigration()
    {
        echo "4. Verifying migration...\n";
        
        // Check if new tables exist
        if (!Schema::hasTable('quis_huruf_sessions')) {
            throw new Exception('New quis_huruf_sessions table not found');
        }
        
        if (!Schema::hasTable('quis_huruf_session_soals')) {
            throw new Exception('New quis_huruf_session_soals table not found');
        }
        
        // Check table structure
        $columns = Schema::getColumnListing('quis_huruf_sessions');
        if (!in_array('id', $columns) || !in_array('mode', $columns) || !in_array('selected_soals', $columns)) {
            throw new Exception('New table structure is incorrect');
        }
        
        echo "   ✅ Migration verification passed\n\n";
    }
    
    private function rollback()
    {
        echo "\n🔄 Rolling back changes...\n";
        
        // Drop new tables
        Schema::dropIfExists('quis_huruf_session_soals');
        Schema::dropIfExists('quis_huruf_sessions');
        
        // Restore from backup
        if (!empty($this->backupTables)) {
            Schema::create('quis_huruf_sessions', function ($table) {
                $table->id();
                $table->char('id_user', 26);
                $table->enum('level', ['beginner', 'intermediate', 'advanced']);
                $table->enum('jenis_huruf', ['hiragana', 'katakana']);
                $table->integer('waktu_max')->nullable();
                $table->timestamp('started_at')->nullable();
                $table->timestamp('ended_at')->nullable();
                $table->integer('total_exp')->default(0);
                $table->integer('total_benar')->default(0);
                $table->timestamps();
            });
            
            Schema::create('quis_huruf_session_soals', function ($table) {
                $table->id();
                $table->char('id_user', 26);
                $table->unsignedBigInteger('session_id');
                $table->unsignedBigInteger('soal_id');
                $table->string('user_answer')->nullable();
                $table->boolean('is_correct')->default(false);
                $table->integer('attempt')->default(1);
                $table->integer('exp')->default(0);
                $table->timestamps();
            });
            
            DB::statement("INSERT INTO quis_huruf_sessions SELECT * FROM {$this->backupTables['sessions']}");
            DB::statement("INSERT INTO quis_huruf_session_soals SELECT * FROM {$this->backupTables['soals']}");
            
            echo "   ✅ Rollback completed - data restored from backup\n";
        }
    }
}

// Run the migration
$script = new QuizMigrationScript();
$script->run(); 