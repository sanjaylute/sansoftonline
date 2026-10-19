<?php

use Illuminate\Support\Facades\Artisan;

Artisan::command('about:business', function () { $this->comment('Sansoft marketing API'); });
