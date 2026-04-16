<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();

            $table->string('type'); // Apartment / House
            $table->decimal('price', 12, 2);
            $table->string('location');

            $table->integer('size');
            $table->integer('beds')->nullable();
            $table->integer('baths')->nullable();

            $table->text('description')->nullable();

            $table->json('images')->nullable(); // store array of images

            $table->string('phone')->nullable();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
