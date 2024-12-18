CREATE TABLE IF NOT EXISTS todo (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    todoTitle VARCHAR(50) DEFAULT NULL,
    todoDescription TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    isCompleted TINYINT DEFAULT 0
);
