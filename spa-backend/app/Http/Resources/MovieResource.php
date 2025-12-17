<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class MovieResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'views' => $this->views,
            'producer' => $this->producer,
            'description' => $this->description,
            'image' => asset(Storage::url("movies/$this->poster")),
            'categories' => $this->categories,
            'score' => $this->score,
            'release' => $this->release,
            'year' => Carbon::parse($this->release)->format('Y'),
            'duration' => $this->duration,
        ];
    }
}
