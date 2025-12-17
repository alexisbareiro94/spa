<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShowTimeSeat extends Model
{
    protected $table = "show_time_seats";

    protected $fillable = [
        'show_id',
        'seat_id',
        'type_seat_id',
        'status',
    ];

    public function showTime()
    {
        return $this->belongsTo(ShowTime::class, 'show_id');
    }

    public function seat()
    {
        return $this->belongsTo(Seat::class, 'seat_id');
    }

    public function typeSeat()
    {
        return $this->belongsTo(TypeSeat::class, 'type_seat_id');
    }
}
