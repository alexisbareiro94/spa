<?php

declare(strict_types=1);

namespace App\Services;

class RoomService
{
    public function process_seats(int $capacity): array
    {
        $valor = (int)sqrt($capacity);
        $seats = [];
        for ($i = 0; $i < $valor; $i++) {
            $char = chr(65 + $i);
            $seats[$char] = $valor;
        }

        if ($capacity > $valor * $valor) {
            $toAdd = $capacity - $valor * $valor;
            foreach ($seats as $key => $item) {
                $seats[$key] = $item + $toAdd;
                break;
            }
        }
        return $seats;
    }
}
