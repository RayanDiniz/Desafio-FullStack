<?php

use App\Http\Controllers\ApiController;
use Facade\FlareClient\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get("niveis", [ApiController::class, "getAllNivel"]);
Route::get("niveis/{id}", [ApiController::class, "getNivel"]);
Route::post("nivel", [ApiController::class, "createNivel"]);
Route::put("nivel/{id}", [ApiController::class, "updateNivel"]);
Route::delete("nivel/{id}", [ApiController::class, "deleteNivel"]);

Route::get("devs", [ApiController::class, "getAllDevs"]);
Route::get("devs/{id}", [ApiController::class, "getDev"]);
Route::post("dev", [ApiController::class, "createDev"]);
Route::put("dev/{id}", [ApiController::class, "updateDev"]);
Route::delete("dev/{id}", [ApiController::class, "deleteDev"]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
