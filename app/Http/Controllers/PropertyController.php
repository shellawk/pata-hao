<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;

class PropertyController extends Controller
{
    // GET /api/properties
    public function index()
    {
        return Property::latest()->get();
    }

    // POST /api/properties
    public function store(Request $request)
    {
        return Property::create([
            ...$request->all(),
            'user_id' => auth()->id()
        ]);
    }
}