<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use Illuminate\Http\Request;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(Request $request){
        $q = $request->query('q');
        $query = Category::query();

        if(filled($q)){
            $query->whereLike('name', "%$q%");
        }

        $categories = $query->orderBy('name')->get();
        return CategoryResource::collection($categories);
    }

    public function store(CategoryRequest $request)
    {
        try{
            $data = $request->validated();
            
            $category = Category::create($data);
            return response()->json([
                'message' => 'Categoria Creada',
                'category' => $category
            ]);

        }catch(\Exception $e){
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function update(Request $request, string $id){
        try{
            $request->validate([
                'name' => 'required',                
            ]);
            $category = Category::find($id);
            $category->update([
                'name' => $request->name ?? $category->name,
            ]);

            return response()->json([
                'message' => 'Categoría Actualizada'
            ]);

        }catch(\Exception $e){
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function destroy(string $id){
        try{
            Category::destroy($id);

            return response()->json([
                'message' => 'Categoría eliminada'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
