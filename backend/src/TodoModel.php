<?php
// TodoModel.php - Manages the todo objects (CRUD operations)

require_once 'db.config.php'; // Include database configuration

class TodoModel
{
    // Get all todos
    public function getAllTodos()
    {
        global $db; // Use MeekroDB instance
        return $db->query("SELECT * FROM todo");
    }

    // Get a specific todo by ID
    public function getTodoById($id)
    {
        global $db; // Use MeekroDB instance
        return $db->queryFirstRow("SELECT * FROM todo WHERE id = %i", $id);
    }

    // Create a new todo
    public function createTodo($title, $description)
    {
        global $db; // Use MeekroDB instance
        $db->insert('todo', [
            'todoTitle' => $title,
            'todoDescription' => $description,
        ]);

        // Return the newly created todo item
        return $db->queryFirstRow("SELECT * FROM todo WHERE id = %i", $db->insertId());
    }

    // Delete a todo by ID
    public function deleteTodo($id)
    {
        global $db; // Use MeekroDB instance
        $result = $db->query("DELETE FROM todo WHERE id = %i", $id);
        return $db->affectedRows() > 0;
    }
    // Update a todo by ID
    public function updateTodo($id, $data)
    {
        global $db; // Use MeekroDB instance

        // Build an update array dynamically
        $updateData = [];
        if (isset($data['todoTitle'])) {
            $updateData['todoTitle'] = $data['todoTitle'];
        }
        if (isset($data['todoDescription'])) {
            $updateData['todoDescription'] = $data['todoDescription'];
        }
        if (isset($data['isCompleted'])) {
            $updateData['isCompleted'] = $data['isCompleted'];
        }

        // If no update data, return false
        if (empty($updateData)) {
            return false;
        }

        // Execute the update query
        $db->update('todo', $updateData, "id=%i", $id);
        return $db->affectedRows() > 0;
    }

}
