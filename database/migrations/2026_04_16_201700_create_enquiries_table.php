<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('enquiries', function (Blueprint $table) {
            $table->id();

            // who created enquiry
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            // optional (for property-specific enquiry)
            $table->foreignId('property_id')->nullable()->constrained()->nullOnDelete();

            // filters (from your HTML form)
            $table->string('type')->nullable();
            $table->string('location')->nullable();

            $table->integer('size')->nullable();
            $table->decimal('min_price', 12, 2)->nullable();
            $table->decimal('max_price', 12, 2)->nullable();

            $table->integer('beds')->nullable();
            $table->integer('baths')->nullable();

            $table->text('message')->nullable();

            // status system
            $table->string('status')->default('open'); // open / closed
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
