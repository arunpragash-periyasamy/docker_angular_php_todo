# Use official PHP image with PHP-FPM
FROM php:8.2-fpm

# Enable required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory
WORKDIR /var/www/html

# Copy application files to the container
COPY . .

# Install dependencies using Composer
RUN composer install

