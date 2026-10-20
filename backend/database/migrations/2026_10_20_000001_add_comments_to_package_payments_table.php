<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('package_payments', function (Blueprint $table) {
            $table->text('comments')->nullable()->after('customer_email');
        });
    }

    public function down(): void
    {
        Schema::table('package_payments', function (Blueprint $table) {
            $table->dropColumn('comments');
        });
    }
};
