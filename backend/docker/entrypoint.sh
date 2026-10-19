#!/bin/sh
set -eu

cd /var/www/html
if [ "${DB_CONNECTION:-sqlite}" = "sqlite" ]; then
    database_file="${DB_DATABASE:-/var/www/html/storage/app/database.sqlite}"
    mkdir -p "$(dirname "$database_file")"
    if [ ! -f "$database_file" ]; then
        touch "$database_file"
    fi
    chown www-data:www-data "$database_file" "$(dirname "$database_file")"
fi
php artisan migrate --force
php artisan config:cache

exec "$@"
