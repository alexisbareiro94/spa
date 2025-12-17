<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreSeatRequest;
use App\Models\{Seat, Room};
use Illuminate\Support\Facades\DB;
use App\Http\Resources\SeatResource;
use App\Http\Resources\SeatCollection;

class SeatController extends Controller
{
    public function index()
    {
        $seats = Seat::with('room')->get();

        return new SeatCollection($seats);
    }

    public function store(StoreSeatRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->validated();
            Seat::insert($data);
            $seats = Seat::where('room_id', $data[0]['room_id'])->get();
            $room = Room::find($data[0]['room_id']);
            $capacity = $room->capacity;
            $seatsCount = $seats->count();

            if ($seatsCount > $capacity) {
                DB::rollBack();
                return response()->json(['error' => 'The number of seats exceeds the capacity of the room'], 400);
            }
            DB::commit();
            return response()->json([$seats->toArray()], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show(string $id)
    {
        try {
            $seat = Seat::with('room')->find($id);
            return new SeatResource($seat);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
