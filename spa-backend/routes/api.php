<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\SeatController;
use App\Http\Controllers\ShowTimeController;
use App\Http\Controllers\ShowSeatController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Controllers\TypeSeatController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/category', [CategoryController::class, 'index']);
Route::get('/movie', [MovieController::class, 'index']);
Route::get('/movie/{id}', [MovieController::class, 'show']);

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::middleware(AdminMiddleware::class)->group(function () {
        Route::post('/category', [CategoryController::class, 'store']);
        Route::put('/category/{id}', [CategoryController::class, 'update']);
        Route::delete('/category/{id}', [CategoryController::class, 'destroy']);

        Route::post('/movie', [MovieController::class, 'store']);
        Route::post('/movie/{id}', [MovieController::class, 'update']);
        Route::delete('/movie/{id}', [MovieController::class, 'destroy']);

        Route::get('/room', [RoomController::class, 'index']);
        Route::get('/room/{id}', [RoomController::class, 'show']);
        Route::post('/room', [RoomController::class, 'store']);

        Route::get('/seat', [SeatController::class, 'index']);
        Route::post('/seat', [SeatController::class, 'store']);
        Route::get('/seat/{id}', [SeatController::class, 'show']);

        Route::get('/showtime', [ShowTimeController::class, 'index']);
        Route::post('/showtime', [ShowTimeController::class, 'store']);

        Route::get('/type-seat', [TypeSeatController::class, 'index']);
        Route::post('/type-seat', [TypeSeatController::class, 'store']);
        Route::get('/type-seat/{id}', [TypeSeatController::class, 'show']);

        Route::get('/show-seat', [ShowSeatController::class, 'index']);
        Route::post('/show-seat', [ShowSeatController::class, 'store']);
        Route::get('/show-seat/{id}', [ShowSeatController::class, 'show']);
    });
});

use App\Models\Movie;
use Illuminate\Support\Facades\Storage;
use App\Models\MovieCategory;
use App\Models\Seat;

Route::get('/debug', function () {});
