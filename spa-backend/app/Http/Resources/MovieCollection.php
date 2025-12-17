<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class MovieCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return $this->collection->map(function ($movie) {
            return [
                'id' => $movie->id,
                'title' => $movie->title,
                'description' => $movie->description,
                'duration' => $movie->duration,
                'views' => $movie->views,
                'producer' => $movie->producer,
                'image' => asset("movies/$movie->poster"),
                'score' => $movie->score,
                'release' => $movie->release,
                'year' => Carbon::parse($movie->release)->format('Y'),
                'categories' => $movie->categories->map(function ($category) {
                    return [
                        'id' => $category->id,
                        'name' => $category->name,
                    ];
                }),
            ];
        })->toArray();
    }
}
