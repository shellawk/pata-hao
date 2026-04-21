<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();

            // owner
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // optional property link
            $table->foreignId('property_id')->nullable()->constrained()->nullOnDelete();

            // enquiry type
            $table->string('type'); // Apartment | House (make required if always needed)
            $table->string('location');

            // size range (FIXED)
            $table->integer('min_size')->nullable();
            $table->integer('max_size')->nullable();

            // price range
            $table->decimal('min_price', 12, 2)->nullable();
            $table->decimal('max_price', 12, 2)->nullable();

            // property features
            $table->integer('beds')->nullable();
            $table->integer('baths')->nullable();

            // message
            $table->text('message')->nullable();

            // status system
            $table->string('status')->default('open');
            $table->foreignId('closed_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('closed_at')->nullable();

            $table->timestamps();
        });

    }

    public function down(): void
    {
        Schema::dropIfExists('enquiries');
    }
};
