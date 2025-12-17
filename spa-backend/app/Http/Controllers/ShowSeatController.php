<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShowTimeSeat;

class ShowSeatController extends Controller
{
    public function index()
    {
        return response()->json(ShowTimeSeat::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            '*.seat_id' => 'required|exists:seats,id',
            '*.type_seat_id' => 'required|exists:type_seats,id',
            '*.show_id' => 'required|exists:showtimes,id',
            '*.status' => 'required|in:available,unavailable',
        ]);

        try {
            $showSeat = ShowTimeSeat::insert($request->all());
            return response()->json($showSeat);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
