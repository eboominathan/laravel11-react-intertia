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
            $table->enum('name', ['jeevan_praman', 'ration', 'aadhar', 'voter_id', 'pan', 'pf', 'others']);
            $table->string('service_type');
            $table->string('acknowledgement_no')->nullable();
            $table->string('status')->default('pending');
            $table->enum('payment_status',['paid','unpaid'])->default('unpaid');
            $table->string('follower_name');
            $table->string('location')->nullable();
            $table->text('comments')->nullable();

            // Assuming the correct table names are plural
            $table->foreignId('customer_id')->nullable()->constrained('customers');
            $table->foreignId('category_id')->nullable()->constrained('categories');
            $table->foreignId('subcategory_id')->nullable()->constrained('subcategories');
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
