<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShowTime extends Model
{
    protected $table = 'showtimes';

    protected $fillable = [
        'movie_id',
        'room_id',
        'status',
        'start',
        'end',
        'date',
        'seats_available',
        'occupied_seats',
    ];

    public function movie()
    {
        return $this->belongsTo(Movie::class, 'movie_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class, 'showtime_id');
    }

    public function seats()
    {
        return $this->hasMany(ShowTimeSeat::class, 'show_id');
    }
}
