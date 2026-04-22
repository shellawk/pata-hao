<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\EnquiryController;
use App\Http\Controllers\PropertyController;
use App\Http\Controllers\RecentlyViewedPropertyController;
use App\Models\Enquiry;
use App\Models\Property;
use App\Models\RecentlyViewedProperty;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {

    $recent = [];

    if (auth()->check()) {
        $recent = RecentlyViewedProperty::with('property')
            ->where('user_id', auth()->id())
            ->latest()
            ->first()?->property;
    }

    return Inertia::render('Home', [
        'properties' => \App\Models\Property::all(),
        'recent' => $recent,
        ]);
    }) ->name('home');

Route::get('/enquiries', function () {
    return Inertia::render('Enquiries', [
        'enquiries' => Enquiry::where('user_id', auth()->id())
            ->with('user')
            ->latest()
            ->get()
    ]);
})->middleware(['auth'])->name('enquiries');


Route::post('/enquiries', [EnquiryController::class, 'store'])
    ->middleware('auth')
    ->name('enquiries.store');


Route::get('/agent', function () {
    return Inertia::render('Agent', [
        'enquiries' => Enquiry::with('user')
            ->where('status', 'open')
            ->latest()
            ->get(),
        'properties' => Property::where('user_id', auth()->id())
            ->latest()
            ->get(),
    ]);
})->middleware(['auth'])->name('agent');

Route::post('/agent/assign', [AgentController::class, 'assign'])
    ->middleware('auth')
    ->name('agent.assign');


Route::get('/admin', function () {
    return Inertia::render('Admin', [
        'users' => \App\Models\User::latest()->get(),
        'properties' => Property::latest()->get(),
        'enquiries' => Enquiry::with('user')->latest()->get(),
    ]);
})->middleware(['auth'])->name('admin');

// =====================
// ADMIN USER MANAGEMENT
// =====================
Route::delete('/admin/users/{user}', [\App\Http\Controllers\AdminUserController::class, 'destroy'])
    ->name('admin.users.destroy');

Route::patch('/admin/users/{user}', [\App\Http\Controllers\AdminUserController::class, 'update'])
    ->name('admin.users.update');


Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::post('/recently-viewed', [RecentlyViewedPropertyController::class, 'store']);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('/enquiries', [EnquiryController::class, 'store'])->name('enquiries.store');
    Route::patch('/enquiries/{enquiry}', [EnquiryController::class, 'toggleStatus'])->name('enquiries.toggle');
    Route::delete('/enquiries/{enquiry}', [EnquiryController::class, 'destroy'])->name('enquiries.destroy');

    // =====================
    // AGENT PROPERTIES
    // =====================
    Route::post('/properties', [PropertyController::class, 'store'])
        ->name('properties.store');

    Route::delete('/properties/{property}', [PropertyController::class, 'destroy'])
        ->name('properties.destroy');
    Route::patch('/properties/{property}', [PropertyController::class, 'update'])
        ->name('properties.update');
});

require __DIR__.'/auth.php';
