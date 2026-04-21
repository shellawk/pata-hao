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
        $validated = $request->validate([
            'type' => 'required|string',
            'location' => 'required|string',
            'price' => 'required|numeric',
            'size' => 'required|integer',
            'beds' => 'nullable|integer',
            'baths' => 'nullable|integer',
            'description' => 'nullable|string',
            'phone' => 'nullable|string', // ✅ IMPORTANT
        ]);

        Property::create([
            ...$validated,
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