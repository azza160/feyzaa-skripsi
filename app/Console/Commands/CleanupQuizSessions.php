<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\QuisHurufSession;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class CleanupQuizSessions extends Command
{
    protected $signature = 'quiz:cleanup {--days=90 : Days to keep sessions} {--archive : Archive instead of delete}';
    protected $description = 'Cleanup old quiz sessions while preserving attempt tracking data';

    public function handle()
    {
        $days = $this->option('days');
        $archive = $this->option('archive');
        $cutoffDate = Carbon::now()->subDays($days);

        $this->info("Cleaning up quiz sessions older than {$days} days...");

        // Count sessions to be processed
        $sessionsToProcess = QuisHurufSession::where('created_at', '<', $cutoffDate)->count();
        
        if ($sessionsToProcess === 0) {
            $this->info('No old sessions found to cleanup.');
            return 0;
        }

        if ($archive) {
            // Archive old sessions to preserve attempt tracking
            $this->info("Archiving {$sessionsToProcess} old sessions...");
            
            // Create archive table if not exists
            $this->createArchiveTableIfNotExists();
            
            // Archive sessions older than cutoff date
            $archived = DB::table('quis_huruf_sessions')
                ->where('created_at', '<', $cutoffDate)
                ->whereNotNull('ended_at') // Only archive completed sessions
                ->get();
            
            foreach ($archived as $session) {
                DB::table('quis_huruf_sessions_archive')->insert([
                    'id' => $session->id,
                    'id_user' => $session->id_user,
                    'level' => $session->level,
                    'jenis_huruf' => $session->jenis_huruf,
                    'mode' => $session->mode,
                    'waktu_max' => $session->waktu_max,
                    'started_at' => $session->started_at,
                    'ended_at' => $session->ended_at,
                    'total_exp' => $session->total_exp,
                    'total_benar' => $session->total_benar,
                    'selected_soals' => $session->selected_soals,
                    'user_answers' => $session->user_answers,
                    'created_at' => $session->created_at,
                    'updated_at' => $session->updated_at,
                    'archived_at' => now(),
                ]);
            }
            
            // Delete archived sessions from main table
            $deleted = QuisHurufSession::where('created_at', '<', $cutoffDate)
                ->whereNotNull('ended_at')
                ->delete();
                
            $this->info("Archived and deleted {$deleted} old sessions.");
        } else {
            // Only delete very old sessions (180+ days) to preserve attempt tracking
            $veryOldDate = Carbon::now()->subDays(180);
            $sessionsToDelete = QuisHurufSession::where('created_at', '<', $veryOldDate)->count();
            
            if ($sessionsToDelete > 0) {
                $deleted = QuisHurufSession::where('created_at', '<', $veryOldDate)->delete();
                $this->info("Deleted {$deleted} very old sessions (180+ days).");
            } else {
                $this->info("No very old sessions to delete. Use --archive flag to archive instead.");
            }
        }

        // Optimize database
        $this->info('Optimizing database...');
        DB::statement('OPTIMIZE TABLE quis_huruf_sessions');

        $this->info('Cleanup completed successfully!');
        return 0;
    }

    /**
     * Create archive table if not exists
     */
    private function createArchiveTableIfNotExists(): void
    {
        if (!DB::getSchemaBuilder()->hasTable('quis_huruf_sessions_archive')) {
            DB::statement('
                CREATE TABLE quis_huruf_sessions_archive LIKE quis_huruf_sessions
            ');
            
            // Add archived_at column
            DB::statement('
                ALTER TABLE quis_huruf_sessions_archive 
                ADD COLUMN archived_at TIMESTAMP NULL DEFAULT NULL
            ');
            
            $this->info('Created archive table: quis_huruf_sessions_archive');
        }
    }
} 