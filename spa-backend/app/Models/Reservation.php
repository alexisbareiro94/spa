<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $table = 'reservations';

    protected $fillable = [
        'user_id',
        'showtime_id',
        'seats',
        'amount',
        'code',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function showtime()
    {
        return $this->belongsTo(ShowTime::class);
    }

    public function casts()
    {
        return [
            'seats' => 'array',
        ];
    }
}
