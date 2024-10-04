FROM php:8.3.12-bullseye
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www
COPY composer.json composer.lock ./
COPY . .
ENV COMPOSER_ALLOW_SUPERUSER=1
RUN echo "APP_KEY=base64:"$(openssl rand -base64 32) > .env
RUN composer install
RUN composer dump-autoload
RUN php artisan key:generate
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host", "0.0.0.0", "--port", "8000"]
