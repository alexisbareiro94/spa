<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreShowTimeRequest extends FormRequest
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
            'movie_id' => 'required|exists:movies,id',
            'room_id' => 'required|exists:rooms,id',
            'start' => 'required|date_format:H:i',
            'end' => 'required|date_format:H:i|after:start',
            'date' => 'required|date|after_or_equal:today',
            'status' => 'required',
            'seats_available' => 'required|gt:0',
            'occupied_seats' => 'required|min:0',
        ];
    }

    public function messages(): array
    {
        return [
            'movie_id.required' => 'La película es obligatoria.',
            'movie_id.exists' => 'La película seleccionada no existe.',

            'room_id.required' => 'La sala es obligatoria.',
            'room_id.exists' => 'La sala seleccionada no existe.',

            'start.required' => 'La hora de inicio es obligatoria.',
            'start.date_format' => 'La hora de inicio debe tener el formato HH:MM.',

            'end.required' => 'La hora de finalización es obligatoria.',
            'end.date_format' => 'La hora de finalización debe tener el formato HH:MM.',
            'end.after' => 'La hora de finalización debe ser posterior a la hora de inicio.',

            'date.required' => 'La fecha es obligatoria.',
            'date.date' => 'La fecha no es válida.',
            'date.after_or_equal' => 'La fecha debe ser hoy o una fecha futura.',

            'status.required' => 'El estado es obligatorio.',

            'seats_available.required' => 'El número de asientos disponibles es obligatorio.',
            'seats_available.gt' => 'El número de asientos disponibles debe ser mayor que 0.',
        ];
    }
}
