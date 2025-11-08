<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post("/signin", [AuthController::class, "signin"]);
Route::post("/signup", [AuthController::class, "signup"]);

Route::middleware("auth:sanctum")->group(function () {
    Route::get("/signout", [AuthController::class, "signout"]);
    Route::get("/user", function (Request $request) {
        return $request->user();
    });
    Route::apiResource("books", BookController::class);
});
