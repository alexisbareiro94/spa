<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use App\Models\{Movie, MovieCategory};

class MovieService
{
    public function process_image_movie_updated(Movie $movie, $posterRequest)
    {
        $path = public_path("movies/{$movie->poster}");
        if (file_exists($path)) {
            unlink($path);
        }
        $name =  time() . '.' .  $posterRequest->getClientOriginalExtension();

        $posterRequest->move('movies', $name);
        return $name;
    }

    public function process_categories_movie_updated($dataCategoryId, Movie $movie)
    {
        $dataCollection = collect($dataCategoryId);
        $categories = MovieCategory::where('movie_id', $movie->id)->get()->pluck('category_id');
        $quitar = $categories->diff($dataCollection);
        $agregar = $dataCollection->diff($categories);

        if ($agregar) {
            foreach ($agregar as $category) {
                MovieCategory::create([
                    'category_id' => $category,
                    'movie_id' => $movie->id,
                ]);
            }
        }
        if ($quitar) {
            foreach ($quitar as $category) {
                MovieCategory::where('movie_id', $movie->id)
                    ->where('category_id', $category)
                    ->delete();
            }
        }
    }
}
