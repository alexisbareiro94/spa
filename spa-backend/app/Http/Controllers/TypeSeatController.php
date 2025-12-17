<?php

namespace App\Http\Controllers;

use App\Models\TypeSeat;
use Illuminate\Http\Request;

class TypeSeatController extends Controller
{
    public function index()
    {
        return response()->json(TypeSeat::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|in:estandar,vip,3D,premium',
            'extra_price' => 'required|numeric',
        ]);

        try {
            $typeSeat = TypeSeat::create($request->all());
            return response()->json($typeSeat);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function show($id)
    {
        try {
            $typeSeat = TypeSeat::findOrFail($id);
            return response()->json($typeSeat);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
