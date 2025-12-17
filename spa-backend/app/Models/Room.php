<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $table = 'rooms';

    protected $fillable = [
        'number',
        'status',
        'capacity',
    ];

    public function showtimes()
    {
        return $this->hasMany(ShowTime::class, 'room_id');
    }

    public function seats()
    {
        return $this->hasMany(Seat::class, 'room_id');
    }
}
