<?php

require_once 'db.class.php';

// Fetch database configuration from environment variables
$host = getenv('DB_HOST') ?: 'localhost';
$user = getenv('DB_USER') ?: 'todo';
$password = getenv('DB_PASSWORD') ?: 'todoMySQLPassword';
$dbName = getenv('DB_NAME') ?: 'todo_data';
$dsn = 'mysql:host='. $host.';dbname='. $dbName;
// Initialize MeekroDB
$db = new MeekroDB($dsn, $user, $password);
