<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $generos = [
            'Acción',
            'Aventura',
            'Comedia',
            'Drama',
            'Terror',
            'Ciencia ficción',
            'Fantasía',
            'Romance',
            'Suspenso',
            'Misterio',
            'Crimen',
            'Animación',
            'Documental',
            'Musical',
            'Bélica',
            'Western',
            'Deportes',
            'Histórico',
            'Biográfico',
            'Superhéroes',
            'Policial',
            'Psicológico',
            'Catástrofe',
            'Distopía',
            'Postapocalíptico',
            'Juvenil',
            'Fantasía medieval',
            'Fantasía urbana',
            'Cine negro',
            'Espionaje',
            'SuperHeroe',
        ];

        foreach($generos as $genero){
            DB::table('categories')->insert([
                'name' => $genero,
            ]);
        }
    }
}
