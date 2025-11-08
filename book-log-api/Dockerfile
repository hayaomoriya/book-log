FROM php:8.2-fpm
RUN apt-get update && apt-get install -y \
    libzip-dev \
    && docker-php-ext-install zip pdo_mysql
WORKDIR /var/www/server
COPY --from=composer /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER 1
ENV COMPOSER_HOME /composer
COPY . .
EXPOSE 8000
RUN chown www-data:www-data -R ./storage
RUN composer install