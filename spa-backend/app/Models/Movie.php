<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Movie extends Model
{
    protected $table = 'movies';

    protected $fillable = [
        'title',
        'slug',        
        'description',
        'duration',
        'poster',
        'producer',
        'release',
        'score',
        'views',
    ];

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'movie_categories', 'movie_id', 'category_id');
    }


    public function showtimes()
    {
        return $this->hasMany(ShowTime::class, 'movie_id');
    }
}
