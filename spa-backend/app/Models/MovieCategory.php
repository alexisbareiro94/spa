<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MovieCategory extends Model
{
    protected $table = 'movie_categories';

    protected $fillable = [
        'movie_id',
        'category_id'
    ];
    
}
