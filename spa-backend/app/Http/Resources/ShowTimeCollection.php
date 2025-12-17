<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class ShowTimeCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($show) {
            return [
                'id' => $show->id,
                'status' => $show->status,
                'start' => Carbon::parse($show->start)->format('H:i:s'),
                'end' => Carbon::parse($show->end)->format('H:i:s'),
                'date' => Carbon::parse($show->date)->format('d-m-Y'),
                'seats_available' => $show->seats_available,
                'occupied_seats' => $show->occupied_seats,
                'movie' => new MovieResource($show->movie),
                'room' => new RoomResource($show->room),
                'reservations' => $show->reservations,
                'seats' => $show->seats->groupBy('seat.row')->map(function ($seats) {
                    return $seats->map(function ($seat) {
                        return [
                            'number' => $seat->seat->number,
                            'status' => $seat->status,
                            'type' => $seat->typeSeat->name,
                            'extra_price' => $seat->typeSeat->extra_price,
                        ];
                    });
                }),
            ];
        })->values()->toArray();
    }
}
