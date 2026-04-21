<?php

namespace App\Http\Controllers;

use App\Models\Enquiry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EnquiryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|in:Apartment,House',
            'location' => 'required|string',

            'min_price' => 'nullable|numeric',
            'max_price' => 'nullable|numeric',

            'min_size' => 'nullable|numeric',
            'max_size' => 'nullable|numeric',

            'beds' => 'nullable|integer',
            'baths' => 'nullable|integer',

            'message' => 'nullable|string',
        ]);

        Enquiry::create([
            'user_id' => auth()->id(),
            'type' => $request->type,
            'location' => $request->location,
            'min_price' => $request->min_price,
            'max_price' => $request->max_price,
            'min_size' => $request->min_size,
            'max_size' => $request->max_size,
            'beds' => $request->beds,
            'baths' => $request->baths,
            'message' => $request->message,

            'status' => 'open',
        ]);

        return redirect()->route('enquiries');
    }

    public function toggleStatus(Enquiry $enquiry)
    {
        $this->authorizeOwner($enquiry);

        $enquiry->update([
            'status' => $enquiry->status === 'open' ? 'closed' : 'open',
        ]);

        return back();
    }

    public function destroy(Enquiry $enquiry)
    {
        $this->authorizeOwner($enquiry);

        $enquiry->delete();

        return back();
    }

    private function authorizeOwner(Enquiry $enquiry)
    {
        abort_if($enquiry->user_id !== auth()->id(), 403);
    }
}