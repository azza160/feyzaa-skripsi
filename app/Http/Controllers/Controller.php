<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Hapus session quis_huruf_sessions dan quis_kosakata_sessions yang masih aktif (ended_at null) untuk user login
     */
    protected function cleanupActiveQuisSession()
    {
        if (!auth()->check()) return;
        $userId = auth()->id();
        
        // Cleanup huruf sessions
        $activeHurufSessions = \App\Models\QuisHurufSession::where('id_user', $userId)
            ->whereNull('ended_at')
            ->get();
        foreach ($activeHurufSessions as $session) {
            $session->delete();
        }
        
        // Cleanup kosakata sessions
        $activeKosakataSessions = \App\Models\QuisKosakataSession::where('user_id', $userId)
            ->whereNull('ended_at')
            ->get();
        foreach ($activeKosakataSessions as $session) {
            $session->delete();
        }
        
        // Show alert if any sessions were cleaned up
        if ($activeHurufSessions->count() > 0 || $activeKosakataSessions->count() > 0) {
            $totalSessions = $activeHurufSessions->count() + $activeKosakataSessions->count();
            session()->flash('warning', "Session kuis yang belum selesai telah dihapus. Total: {$totalSessions} session.");
        }
    }
}
