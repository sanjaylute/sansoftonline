<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('package_payments', function (Blueprint $table) {
            $table->id();
            $table->string('gateway', 20);
            $table->string('gateway_order_id')->unique();
            $table->string('gateway_payment_id')->nullable();
            $table->string('package', 80);
            $table->string('tier', 100);
            $table->unsignedInteger('amount_minor');
            $table->char('currency', 3)->default('USD');
            $table->string('customer_name', 120);
            $table->string('customer_email', 190);
            $table->string('status', 24)->default('pending');
            $table->json('gateway_payload')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('package_payments');
    }
};
