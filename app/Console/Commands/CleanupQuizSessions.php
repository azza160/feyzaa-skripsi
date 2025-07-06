<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\QuisHurufSession;
use App\Models\QuisHurufSessionSoal;
use Carbon\Carbon;

class CleanupQuizSessions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'quiz:cleanup {--days=30 : Number of days to keep old sessions}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up old quiz sessions and session soal data to prevent database bloat';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $days = $this->option('days');
        $cutoffDate = Carbon::now()->subDays($days);

        $this->info("Cleaning up quiz sessions older than {$days} days...");

        // Count sessions to be deleted
        $sessionsToDelete = QuisHurufSession::where('created_at', '<', $cutoffDate)->count();
        $sessionSoalsToDelete = QuisHurufSessionSoal::where('created_at', '<', $cutoffDate)->count();

        if ($sessionsToDelete === 0 && $sessionSoalsToDelete === 0) {
            $this->info('No old sessions found to clean up.');
            return;
        }

        // Delete old session soal records first (due to foreign key constraints)
        $deletedSessionSoals = QuisHurufSessionSoal::where('created_at', '<', $cutoffDate)->delete();
        
        // Delete old sessions
        $deletedSessions = QuisHurufSession::where('created_at', '<', $cutoffDate)->delete();

        $this->info("Successfully cleaned up:");
        $this->info("- {$deletedSessions} quiz sessions");
        $this->info("- {$deletedSessionSoals} session soal records");
        
        // Show current database stats
        $totalSessions = QuisHurufSession::count();
        $totalSessionSoals = QuisHurufSessionSoal::count();
        
        $this->info("\nCurrent database stats:");
        $this->info("- Total quiz sessions: {$totalSessions}");
        $this->info("- Total session soal records: {$totalSessionSoals}");
    }
} 