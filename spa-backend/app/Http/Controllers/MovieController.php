<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Http\Resources\MovieCollection;
use App\Http\Resources\MovieResource;
use App\Models\{Movie, MovieCategory};
use Illuminate\Support\Str;
use App\Services\MovieService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class MovieController extends Controller
{
    public function __construct(protected MovieService $movieService) {}
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $q = $request->query('q');

        $query = Movie::query();
        if (filled($q)) {
            $query->whereLike('title', "%$q%");
        }
        $movies = $query->with('categories')->get();
        return new MovieCollection($movies);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMovieRequest $request)
    {
        try {
            $data = $request->validated();
            $data['slug'] = Str::slug($data['title'], '_');

            if ($request->hasFile('poster')) {
                $file = $request->file('poster');
                $fileName = time() . '.' . $file->getClientOriginalExtension();
                $file->move('movies', $fileName);
                $data['poster'] = $fileName;
            }

            $movie = Movie::create([
                'title' => $data['title'],
                'slug' => Str::slug($data['title']),
                'description' => $data['description'],
                'duration' => $data['duration'],
                'release' => $data['release'],
                'producer' => $data['producer'],
                'score' => 0,
                'poster' => $fileName,
            ]);

            foreach ($data['categories'] as $category) {
                MovieCategory::create([
                    'movie_id' => $movie->id,
                    'category_id' => $category,
                ]);
            }

            return response()->json([
                'message' => 'Película creada correctamente',
                'data' => $movie,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $movie = Movie::findOrFail($id);
            return new MovieResource($movie);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMovieRequest $request, string $id)
    {
        try {
            DB::beginTransaction();
            $movie = Movie::findOrFail($id);
            $data = $request->validated();

            if ($request->hasFile('poster')) {
                $name = $this->movieService->process_image_movie_updated($movie, $request->file('poster'));
            }

            $movie->update([
                'title' => $data['title'] ?? $movie->title,
                'description' => $data['description'] ?? $movie->description,
                'duration' => $data['duration'] ?? $movie->duration,
                'release' => $data['release'] ?? $movie->release,
                'producer' => $data['producer'] ?? $movie->producer,
                'poster' => $name ?? $movie->poster,
            ]);

            $this->movieService->process_categories_movie_updated($data['categories'], $movie);

            DB::commit();
            return response()->json([
                'data' => $movie,
                'message' => 'Película actualizado'
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $movie = Movie::findOrFail($id);

            if (Storage::disk('public')->exists("movies/$movie->poster")) {
                Storage::disk('public')->delete("movies/$movie->poster");
            }

            $movie->delete();
            return response()->json([
                'message' => 'pelicula borrado',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }
}
