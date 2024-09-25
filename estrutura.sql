CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  status ENUM('done', 'pending') DEFAULT 'pending' NOT NULL
);