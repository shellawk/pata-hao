<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RecentlyViewedProperty;

class RecentlyViewedPropertyController extends Controller
{
    public function store(Request $request)
    {
        if (!auth()->check()) {
            return response()->noContent(); // silently ignore guests
        }

        $request->validate([
            'property_id' => 'required|exists:properties,id',
        ]);

        RecentlyViewedProperty::updateOrCreate(
            [
                'user_id' => auth()->id(),
                'property_id' => $request->property_id,
            ]
        );

        return response()->noContent();
    }
}
