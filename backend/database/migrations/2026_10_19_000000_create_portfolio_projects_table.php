<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('portfolio_projects', function (Blueprint $table) {
            $table->id();
            $table->string('source_campaign_id', 100)->unique();
            $table->string('title', 180);
            $table->string('domain', 255);
            $table->string('category', 80)->default('Other');
            $table->string('thumbnail', 2048);
            $table->text('summary')->nullable();
            $table->json('services')->nullable();
            $table->json('results')->nullable();
            $table->string('market', 8)->nullable();
            $table->boolean('published')->default(true);
            $table->timestamps();
            $table->index(['published', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_projects');
    }
};
