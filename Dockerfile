# Stage 1: Build Angular frontend
FROM node:22-alpine as frontend-build

WORKDIR /frontend

# Copy Angular app files
COPY ./frontend/package*.json ./

# Install Angular dependencies
RUN npm ci
RUN npm i -g @angular/cli

COPY ./frontend/ .

# Build Angular app
RUN npm run build --configuration=production
# Stage 2: Setup PHP backend
# FROM php:8.2-fpm as backend

# # Set working directory
# WORKDIR /var/www/html

# # Install required PHP extensions and system dependencies
# RUN apt-get update && apt-get install -y \
#     git \
#     unzip \
#     zip \
#     && docker-php-ext-install pdo pdo_mysql \
#     && rm -rf /var/lib/apt/lists/*

# # Install Composer
# COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# # Copy backend files
# COPY ./backend/composer.json ./backend/composer.lock ./

# # Install backend dependencies using Composer
# RUN composer install --no-dev --optimize-autoloader

# # Copy the application source code
# COPY ./backend/src ./src
# Use official PHP image with PHP-FPM
FROM php:8.2-fpm

# Enable required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory
WORKDIR /var/www/html

# Copy application files to the container
COPY ./backend/ .

# Install dependencies using Composer
RUN composer install



# Stage 3: Combine Frontend and Backend in Nginx
FROM nginx:latest

# Copy Nginx configuration
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy built Angular app to serve as static files
COPY --from=frontend-build /frontend/dist/todo-app/browser /usr/share/nginx/html

# Copy PHP application
COPY --from=backend /var/www/html /var/www/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
