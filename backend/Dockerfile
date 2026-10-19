FROM php:8.4-apache

RUN apt-get update \
    && apt-get install -y --no-install-recommends libonig-dev libsqlite3-dev unzip \
    && docker-php-ext-install mbstring pdo_mysql pdo_sqlite \
    && a2enmod rewrite headers \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY backend/composer.json backend/composer.lock ./
RUN composer install --no-dev --no-interaction --no-progress --prefer-dist --no-scripts

COPY backend/ ./
RUN composer dump-autoload --no-dev --optimize
COPY backend/docker/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY backend/docker/entrypoint.sh /usr/local/bin/sansoft-entrypoint

RUN chmod +x /usr/local/bin/sansoft-entrypoint \
    && chown -R www-data:www-data storage bootstrap/cache

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/sansoft-entrypoint"]
CMD ["apache2-foreground"]
