<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Property;
use App\Models\Enquiry;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // =====================
        // USERS
        // =====================

        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@patahao.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '0700000000'
        ]);

        $agent = User::create([
            'name' => 'Agent John',
            'email' => 'agent@patahao.com',
            'password' => Hash::make('password'),
            'role' => 'agent',
            'phone' => '0712345678'
        ]);

        $user = User::create([
            'name' => 'Normal User',
            'email' => 'user@patahao.com',
            'password' => Hash::make('password'),
            'role' => 'user',
            'phone' => '0799999999'
        ]);

        // =====================
        // PROPERTIES
        // =====================

        $p1 = Property::create([
            'type' => 'Apartment',
            'price' => 50000,
            'location' => 'Nairobi',
            'size' => 900,
            'beds' => 2,
            'baths' => 1,
            'description' => 'Nice apartment in Nairobi',
            'images' => ['apartment1.jpg','apartment2.jpg'],
            'phone' => $agent->phone,
            'user_id' => $agent->id
        ]);

        $p2 = Property::create([
            'type' => 'House',
            'price' => 120000,
            'location' => 'Karen',
            'size' => 2500,
            'beds' => 4,
            'baths' => 3,
            'description' => 'Luxury house in Karen',
            'images' => ['house1.jpg','house2.jpg'],
            'phone' => $agent->phone,
            'user_id' => $agent->id
        ]);

        // =====================
        // ENQUIRIES
        // =====================

        Enquiry::create([
            'user_id' => $user->id,
            'property_id' => $p1->id,
            'type' => 'Apartment',
            'location' => 'Nairobi',
            'beds' => 2,
            'baths' => 1,
            'message' => 'Is this property still available?',
            'status' => 'open'
        ]);

        Enquiry::create([
            'user_id' => $user->id,
            'type' => 'House',
            'location' => 'Karen',
            'min_price' => 100000,
            'max_price' => 150000,
            'beds' => 3,
            'message' => 'Looking for a family home in Karen',
            'status' => 'open'
        ]);
    }
}
