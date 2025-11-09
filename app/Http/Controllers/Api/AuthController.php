<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function signin(Request $request)
    {
        $credentials = $request->only("email", "password");

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken("auth_token")->plainTextToken;

            return response()->json(["token" => $token], 200);
        }

        return response()->json(["message" => "Unauthorized"], 401);
    }

    public function signup(Request $request)
    {
        $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|string|email|max:255|unique:users",
            "password" => "required|string|min:8",
        ]);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);

        $token = $user->createToken("auth_token")->plainTextToken;

        return response()->json(
            [
                "message" => "User successfully registered",
                "token" => $token,
            ],
            201,
        );
    }

    public function signout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(["message" => "Signed out successfully"], 200);
    }
}
