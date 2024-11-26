<?php
// TodoController.php - Handles the CRUD operations for todos

require_once 'TodoModel.php';

class TodoController
{
    private $todoModel;

    public function __construct()
    {
        // Instantiate the Todo model
        $this->todoModel = new TodoModel();
    }

    // Get list of todos
    public function getTodos()
    {
        $todos = $this->todoModel->getAllTodos();
        echo json_encode($todos);
    }

    // Get a specific todo
    public function getTodo($id)
    {
        $todo = $this->todoModel->getTodoById($id);
        if ($todo) {
            echo json_encode($todo);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Todo not found"]);
        }
    }

    // Create a new todo
    public function createTodo($data)
    {
        if (isset($data['todoTitle']) && isset($data['todoDescription'])) {
            $todo = $this->todoModel->createTodo($data['todoTitle'], $data['todoDescription']);
            echo json_encode($todo);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid input data", "data"=> $data]);
        }
    }

    // Delete a specific todo
    public function deleteTodo($id)
    {
        $result = $this->todoModel->deleteTodo($id);
        if ($result) {
            echo json_encode(["message" => "Todo deleted"]);
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Todo not found"]);
        }
    }

    // Update a specific todo
    public function updateTodo($id, $data)
    {
        if (isset($data['todoTitle']) || isset($data['todoDescription']) || isset($data['isCompleted'])) {
            $result = $this->todoModel->updateTodo($id, $data);
            if ($result) {
                echo json_encode(["message" => "Todo updated"]);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Todo not found"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid input data"]);
        }
    }
}
