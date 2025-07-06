<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\QuisHurufSession;
// Removed QuisHurufSessionSoal import - no longer needed
use Carbon\Carbon;

class CleanupOldQuizData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'quiz:cleanup {--days=30 : Number of days to keep data} {--dry-run : Show what would be deleted without actually deleting}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clean up old quiz data to improve database performance';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $days = $this->option('days');
        $dryRun = $this->option('dry-run');
        $cutoffDate = Carbon::now()->subDays($days);

        $this->info("Cleaning up quiz data older than {$days} days (before {$cutoffDate->format('Y-m-d H:i:s')})");

        // Count sessions to be deleted
        $sessionsToDelete = QuisHurufSession::where('created_at', '<', $cutoffDate)->count();
        $this->info("Found {$sessionsToDelete} old quiz sessions");

        if ($sessionsToDelete > 0) {
            if ($dryRun) {
                $this->warn('DRY RUN: Would delete ' . $sessionsToDelete . ' sessions');
            } else {
                // Delete old sessions (this will cascade to session soals)
                $deletedSessions = QuisHurufSession::where('created_at', '<', $cutoffDate)->delete();
                $this->info("Deleted {$deletedSessions} old quiz sessions");
            }
        }

        // Show database statistics
        $totalSessions = QuisHurufSession::count();
        
        $this->info("\nDatabase Statistics:");
        $this->info("- Total quiz sessions: {$totalSessions}");

        if (!$dryRun) {
            $this->info("\nCleanup completed successfully!");
        } else {
            $this->info("\nDry run completed. No data was actually deleted.");
        }
    }
}
