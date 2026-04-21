<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PropertyController extends Controller
{
    // GET /api/properties
    public function index()
    {
        return Property::latest()->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required',
            'location' => 'required',
            'price' => 'required|numeric',
            'size' => 'required|numeric',
            'beds' => 'nullable|integer',
            'baths' => 'nullable|integer',
            'phone' => 'nullable|string',
            'description' => 'nullable|string',
            'images.*' => 'image|max:2048',
        ]);

        $imagePaths = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imagePaths[] = $image->store('properties', 'public');
            }
        }

        Property::create([
        'type' => $request->type,
        'location' => $request->location,
        'price' => $request->price,
        'size' => $request->size,
        'beds' => $request->beds,
        'baths' => $request->baths,
        'phone' => $request->phone,
        'description' => $request->description,
        'images' => $imagePaths,
        'user_id' => auth()->id(),
    ]);

    return back();
    }

    public function destroy(Property $property)
    {
        abort_if($property->user_id !== Auth::id(), 403);

        $property->delete();

        return back();
    }
}