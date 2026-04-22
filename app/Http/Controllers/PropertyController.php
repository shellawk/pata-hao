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
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png|max:5120',
        ]);

        $imagePaths = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');
                $imagePaths[] = '/storage/' . $path;
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
        $user = Auth::user();

        abort_if(
            $user->role !== 'admin' && $property->user_id !== $user->id,
            403
        );

         // Delete images
        // if ($property->images) {
        //     foreach ($property->images as $img) {
        //         $path = str_replace('/storage/', '', $img);
        //         Storage::disk('public')->delete($path);
        //     }
        // }

        $property->delete();

        return back()->with('success', 'Property deleted successfully');
    }

    public function update(Property $property, Request $request)
    {
        $user = Auth::user();

        abort_if(
            $user->role !== 'admin' && $property->user_id !== $user->id,
            403
        );

        $request->validate([
            'type' => 'required',
            'location' => 'required',
            'price' => 'required|numeric',
            'size' => 'required|numeric',
            'beds' => 'nullable|integer',
            'baths' => 'nullable|integer',
            'phone' => 'nullable|string',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png|max:5120',
        ]);

        $imagePaths = [];

        $data = $request->only([
            'type', 'location', 'price', 'size', 'beds', 'baths', 'phone', 'description'
        ]);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('properties', 'public');
                $imagePaths[] = '/storage/' . $path;
            }
            $data['images'] = $imagePaths;
        }

        $property->update($data);

        return back()->with('success', 'Property updated successfully');
    }
}