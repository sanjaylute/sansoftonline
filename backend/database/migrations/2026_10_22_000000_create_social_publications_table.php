<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('social_publications', function (Blueprint $table): void {
            $table->id();
            $table->string('source_url');
            $table->string('channel_id');
            $table->string('channel_service');
            $table->string('buffer_post_id')->nullable();
            $table->string('status')->default('pending');
            $table->text('error_message')->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
            $table->unique(['source_url', 'channel_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('social_publications');
    }
};
