<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreShowTimeRequest;
use App\Http\Resources\ShowTimeCollection;
use Illuminate\Http\Request;
use App\Models\ShowTime;

class ShowTimeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return new ShowTimeCollection(ShowTime::with(['movie', 'room', 'reservations', 'seats'])->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreShowTimeRequest $request)
    {
        try {
            $data = $request->validated();
            $showTime = ShowTime::create($data);
            return response()->json([
                'data' => $showTime,
                'message' => 'Horario creado con exito',
                'code' => 200,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
