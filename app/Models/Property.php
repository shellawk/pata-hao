<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'type',
        'price',
        'location',
        'size',
        'beds',
        'baths',
        'description',
        'images',
        'phone',
        'user_id'
    ];

    protected $casts = [
        'images' => 'array'
    ];
}