<?php
// Enable output buffering at the start to prevent any accidental output
ob_start();

// Include the controller
require_once 'TodoController.php';

// Set headers for CORS and JSON responses
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle OPTIONS preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // No content for OPTIONS, just return a 200 response
    http_response_code(200);
    exit();
}

// Parse JSON input data if available
$jsonData = json_decode(file_get_contents('php://input'), true);

// Simple routing based on the HTTP method and the URL
$method = $_SERVER['REQUEST_METHOD'];
$request = $_SERVER['REQUEST_URI'];

// Remove the leading slash from the request URI
$request = trim($request, '/');

// Parse the request into endpoint and parameters
$parts = explode('/', $request);

// Initialize the controller
$controller = new TodoController();

// Routing logic based on the request URL and HTTP method
if (str_starts_with($request, 'todos')) {
    switch ($method) {
        case 'GET':
            // Handle GET request
            if (isset($parts[1])) {
                // Get specific todo by ID
                $controller->getTodo($parts[1]);
            } else {
                // Get all todos
                $controller->getTodos();
            }
            break;

        case 'POST':
            // Handle POST request to create a new todo
            if (!empty($jsonData)) {
                $controller->createTodo($jsonData);
            } else {
                http_response_code(400);
                echo json_encode(["message" => "Invalid input data"]);
            }
            break;

        case 'PUT':
            // Handle PUT request to update a specific todo
            if (isset($parts[1])) {
                if (!empty($jsonData)) {
                    $controller->updateTodo($parts[1], $jsonData);
                } else {
                    http_response_code(400);
                    echo json_encode(["message" => "No data provided for update"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["message" => "Todo ID is required for updating"]);
            }
            break;

        case 'DELETE':
            // Handle DELETE request to remove a specific todo
            if (isset($parts[1])) {
                $controller->deleteTodo($parts[1]);
            } else {
                http_response_code(400);
                echo json_encode(["message" => "Todo ID is required for deletion"]);
            }
            break;

        default:
            // Method Not Allowed
            http_response_code(405);
            echo json_encode(["message" => "Method not allowed"]);
            break;
    }
} else {
    // Invalid URL (not starting with 'todos')
    http_response_code(404);
    echo json_encode(["message" => "Invalid URL"]);
}

// End output buffering and send the output
ob_end_flush();
