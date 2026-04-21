<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EnquiryController;
use App\Models\Enquiry;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Home', [
        'properties' => \App\Models\Property::all()
    ]);
})->name('home');

Route::get('/enquiries', function () {
    return Inertia::render('Enquiries', [
        'enquiries' => Enquiry::where('user_id', auth()->id())
            ->latest()
            ->get()
    ]);
})->middleware(['auth'])->name('enquiries');


Route::post('/enquiries', [EnquiryController::class, 'store'])
    ->middleware('auth')
    ->name('enquiries.store');

Route::get('/agent', function () {
    return Inertia::render('Agent');
})->middleware(['auth'])->name('agent');

Route::get('/admin', function () {
    return Inertia::render('Admin');
})->middleware(['auth'])->name('admin');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('/enquiries', [EnquiryController::class, 'store'])->name('enquiries.store');
    Route::patch('/enquiries/{enquiry}', [EnquiryController::class, 'toggleStatus'])->name('enquiries.toggle');
    Route::delete('/enquiries/{enquiry}', [EnquiryController::class, 'destroy'])->name('enquiries.destroy');
});

require __DIR__.'/auth.php';
