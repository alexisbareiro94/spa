<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMovieRequest extends FormRequest
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
    public function rules(): array
    {
        return [
            'title' => 'sometimes|nullable|string',
            'description' => 'sometimes|nullable|string',
            'categories' => 'sometimes|nullable|array',
            'categories.*' => 'exists:categories,id',
            'duration' => 'sometimes|nullable',
            'poster' => 'sometimes|nullable|image',
            'release' => 'sometimes|nullable',
            'producer' => 'sometimes|nullable',
        ];
    }

    public function messages()
    {
        return [
            'title.*' => 'error en el campo titulo',
            'description.*' => 'error en el campo descripcion',
            'duration.*' => 'error en el campo duracion',
            'poster.*' => 'error en el campo imagen',
            'release.*' => 'error en el campo lanzamiento',
            'producer.*' => 'error en el campo productor'
        ];
    }
}
