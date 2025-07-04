<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    /**
     * Hapus session quis_huruf_sessions yang masih aktif (ended_at null) untuk user login
     */
    protected function cleanupActiveQuisSession()
    {
        if (!auth()->check()) return;
        $userId = auth()->id();
        $activeSessions = \App\Models\QuisHurufSession::where('id_user', $userId)
            ->whereNull('ended_at')
            ->get();
        foreach ($activeSessions as $session) {
            $session->delete();
        }
    }
}
