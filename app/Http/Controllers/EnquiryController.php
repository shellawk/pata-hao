<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Illuminate\Http\Request;

class EnquiryController extends Controller
{
    // GET /api/enquiries
    public function index()
    {
        return Enquiry::latest()->get();
    }

    // POST /api/enquiries
    public function store(Request $request)
    {
        if (!auth()->check()) {
            return response()->json(['message' => 'Login required'], 401);
        }

        return Enquiry::create([
            ...$request->all(),
            'user_id' => auth()->id(),
            'status' => 'open'
        ]);
    }

    // POST /api/enquiries/{id}/close
    public function close($id)
    {
        $enquiry = Enquiry::findOrFail($id);

        // Only owner or admin can close
        if (
            auth()->id() !== $enquiry->user_id &&
            auth()->user()->role !== 'admin'
        ) {
            abort(403);
        }

        $enquiry->update([
            'status' => 'closed',
            'closed_by' => auth()->id(),
            'closed_at' => now()
        ]);

        return $enquiry;
    }
}