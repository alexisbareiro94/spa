<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMovieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->user()->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    protected function prepareForValidation(): void
    {
        $this->merge([
            'categories' => explode(',', $this->categories),
        ]);
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string',
            'description' => 'required|string',
            'categories' => 'required|array',
            'categories.*' => 'exists:categories,id',
            'duration' => 'required',
            'poster' => 'required|image',
            'release' => 'required',
            'producer' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'El título es obligatorio',
            'title.string' => 'El título debe ser texto',
            'description.required' => 'La descripción es obligatoria',
            'description.string' => 'La descripción debe ser texto',
            'category_id.required' => 'Debe seleccionar al menos una categoría',
            'category_id.array' => 'Las categorías deben ser un arreglo',
            'category_id.*.exists' => 'La categoría seleccionada no existe',
            'duration.required' => 'La duración es obligatoria',
            'poster.required' => 'El póster es obligatorio',
            'poster.image' => 'El póster debe ser una imagen válida',
            'release.required' => 'La fecha de estreno es obligatoria',
            'producer.required' => 'El productor es obligatorio',
        ];
    }
}
