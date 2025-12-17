<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seat extends Model
{
    protected $table = "seats";

    protected $fillable = [
        'room_id',
        'row',
        'number',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }

    public function typeSeat()
    {
        return $this->belongsTo(TypeSeat::class, 'type_seat_id');
    }
}
