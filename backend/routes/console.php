<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('about:business', function () { $this->comment('Sansoft marketing API'); });

Schedule::command('social:publish-blogs')
    ->everyFiveMinutes()
    ->withoutOverlapping();
