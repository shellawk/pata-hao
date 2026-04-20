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

        $properties = [
            [
                'type' => 'Apartment',
                'price' => 50000,
                'location' => 'Nairobi',
                'size' => 900,
                'beds' => 2,
                'baths' => 1,
                'description' => 'Nice apartment in Nairobi',
                'images' => ['apartment1.jpg','apartment2.jpg'],
            ],
            [
                'type' => 'House',
                'price' => 120000,
                'location' => 'Karen',
                'size' => 2500,
                'beds' => 4,
                'baths' => 3,
                'description' => 'Luxury house in Karen',
                'images' => ['house1.jpg','house2.jpg'],
            ],
            [
                'type' => 'Apartment',
                'price' => 65000,
                'location' => 'Westlands',
                'size' => 1100,
                'beds' => 3,
                'baths' => 2,
                'description' => 'Modern apartment',
                'images' => ['apartment1.jpg','apartment2.jpg'],
            ],
            [
                'type' => 'Apartment',
                'price' => 40000,
                'location' => 'Kilimani',
                'size' => 800,
                'beds' => 2,
                'baths' => 1,
                'description' => 'Affordable apartment',
                'images' => ['apartment1.jpg','apartment2.jpg'],
            ],
            [
                'type' => 'Apartment',
                'price' => 75000,
                'location' => 'Lavington',
                'size' => 1300,
                'beds' => 3,
                'baths' => 2,
                'description' => 'Spacious apartment',
                'images' => ['apartment1.jpg','apartment2.jpg'],
            ],
            [
                'type' => 'House',
                'price' => 150000,
                'location' => 'Runda',
                'size' => 3000,
                'beds' => 5,
                'baths' => 4,
                'description' => 'Luxury house',
                'images' => ['house1.jpg','house2.jpg'],
            ],
            [
                'type' => 'House',
                'price' => 90000,
                'location' => 'Ngong',
                'size' => 2000,
                'beds' => 3,
                'baths' => 2,
                'description' => 'Family house',
                'images' => ['house1.jpg','house2.jpg'],
            ],
            [
                'type' => 'House',
                'price' => 110000,
                'location' => 'Syokimau',
                'size' => 2200,
                'beds' => 4,
                'baths' => 3,
                'description' => 'Modern house',
                'images' => ['house1.jpg','house2.jpg'],
            ],
        ];

        foreach ($properties as $p) {
            Property::create([
                ...$p,
                'phone' => $agent->phone,
                'user_id' => $agent->id,
            ]);
        }

        // =====================
        // ENQUIRIES
        // =====================

        Enquiry::create([
            'user_id' => $user->id,
            'property_id' => Property::first()->id,
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
