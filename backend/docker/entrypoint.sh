#!/bin/sh
set -eu

cd /var/www/html
php artisan migrate --force
php artisan config:cache

exec "$@"
