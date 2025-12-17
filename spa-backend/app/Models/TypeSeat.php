<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeSeat extends Model
{
    protected $table = "type_seats";

    protected $fillable = [
        'name',
        'extra_price',
    ];
}
