<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $data = $request->validated();
            $user = User::create($data);
            if ($user->id == 1) {
                $user->update([
                    'role' => 'admin',
                ]);
            }
            return response()->json([
                'message' => 'Registrado correctamente',
                'user' => $user,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function login(Request $request)
    {
        try {
            $validated = $request->validate([
                'email' => 'required|email|exists:users,email',
                'password' => 'required'
            ]);

            if (Auth::attempt($validated)) {
                $user = Auth::user();
                $token = $user->createToken('authToken')->plainTextToken; //for api-client
                return response()->json([
                    'message' => 'Usuario logueado',
                    'user' => $user,
                    'token' => $token, //for api-client
                ]);
            } else {
                return response()->json([
                    'error' => 'credenciales invalidas',
                ], 401);
            }
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 401);
        }
    }

    public function logout()
    {
        try {
            Auth::logout();

            return response()->json([
                'message' => 'logout correcto'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage(),
            ], 400);
        }
    }
}
