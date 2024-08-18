<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('name')->nullable();            
            $table->string('acknowledgement_no')->nullable();
            $table->enum('status',['active','inactive'])->default('active');
            $table->string('service_status')->nullable()->default('pending');
            $table->enum('payment_status',['paid','unpaid'])->default('unpaid');
            $table->string('follower_name');
            $table->string('location')->nullable();
            $table->text('comments')->nullable();
            $table->foreignId('customer_id')->constrained('customers')->nullable();
            $table->foreignId('category_id')->constrained('categories')->nullable();
            $table->foreignId('subcategory_id')->constrained('sub_categories')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users');
            $table->foreignId('updated_by')->nullable()->constrained('users');
            $table->foreignId('deleted_by')->nullable()->constrained('users');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};
