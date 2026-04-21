<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enquiry extends Model
{
    protected $fillable = [
        'user_id',
        'property_id',
        'type',
        'location',

        'min_size',
        'max_size',

        'min_price',
        'max_price',

        'beds',
        'baths',

        'message',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}