<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(api: __DIR__.'/../routes/api.php', commands: __DIR__.'/../routes/console.php', health: '/up')
    ->withMiddleware()
    ->withExceptions(function (Exceptions $exceptions): void {
        // API errors are returned as JSON when the client requests JSON.
    })->create();
