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
        'size',
        'min_price',
        'max_price',
        'beds',
        'baths',
        'message',
        'status',
        'closed_by',
        'closed_at'
    ];
}