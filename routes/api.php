<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\EnquiryController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::get('/properties', [PropertyController::class, 'index']);

Route::post('/properties', [PropertyController::class, 'store'])
    ->middleware(['auth:sanctum','role:agent,admin']);

Route::get('/enquiries', [EnquiryController::class, 'index'])
    ->middleware('auth:sanctum');

Route::post('/enquiries', [EnquiryController::class, 'store'])
    ->middleware('auth:sanctum');

Route::post('/enquiries/{id}/close', [EnquiryController::class, 'close'])
    ->middleware('auth:sanctum');