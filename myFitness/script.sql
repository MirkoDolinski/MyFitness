CREATE DATABASE IF NOT EXISTS myfitness_stock;

USE myfitness_stock;

CREATE TABLE IF NOT EXISTS stock (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(50) NOT NULL,
    cantidad_producto INT NOT NULL
);

INSERT INTO stock (nombre_producto, cantidad_producto) VALUES
('Discos 1kg', 300),
('Discos 2kg', 250),
('Discos 5kg', 150),
('Discos 10kg', 100),
('Barras cortas', 50),
('Barras largas', 40),
('Mariposas para barra', 200);