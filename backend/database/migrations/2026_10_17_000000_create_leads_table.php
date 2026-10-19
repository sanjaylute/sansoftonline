<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table): void {
            $table->id();
            $table->string('name', 120);
            $table->string('email', 190);
            $table->string('phone', 40)->nullable();
            $table->string('subject', 180)->nullable();
            $table->string('service', 180)->nullable();
            $table->string('budget', 120)->nullable();
            $table->text('message');
            $table->string('type', 20)->index();
            $table->timestamps();
        });
    }

    public function down(): void { Schema::dropIfExists('leads'); }
};
