create database gestion_tareas;
use gestion_tareas;
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    f_nacimiento DATE NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    genero CHAR(1) NOT NULL
);

CREATE TABLE categorias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    contenido TEXT NOT NULL,
    id_categoria INT NOT NULL,
    estado TINYINT NOT NULL DEFAULT 2,
    id_usuario INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP 
        DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario)
        REFERENCES usuarios(id)
        ON DELETE CASCADE,
        
	FOREIGN KEY (id_categoria)
        REFERENCES categorias(id)
);

INSERT INTO categorias (nombre) VALUES
('Estudio'),
('Trabajo'),
('Proyecto'),
('Personal'),
('Otros');

INSERT INTO usuarios 
(nombre, apellido, username, f_nacimiento, email, password, genero)
VALUES
('Carlos', 'Ramirez', 'cramirez', '1998-05-14', 'carlos@email.com', '123456', 'M'),
('Ana', 'Torres', 'atorres', '2000-08-21', 'ana@email.com', '123456', 'F'),
('Luis', 'Gomez', 'lgomez', '1997-11-03', 'luis@email.com', '123456', 'M');

INSERT INTO tareas 
(titulo, contenido, id_categoria, estado, id_usuario)
VALUES
('Estudiar Node.js', 
 'Repasar conceptos de Express y middlewares', 
 1, 1, 1),

('Preparar presentación del proyecto', 
 'Crear diapositivas del sistema de gestión de tareas', 
 3, 0, 1),

('Hacer ejercicio', 
 'Ir al gimnasio por la tarde', 
 4, 2, 1),
 
 ('Investigar sobre arquitectura MVC', 
 'Leer documentación sobre patrones de arquitectura', 
 1, 1, 2),

('Completar módulo de autenticación', 
 'Implementar login y manejo de sesiones', 
 3, 2, 2),

('Organizar escritorio de trabajo', 
 'Limpiar archivos y ordenar documentos', 
 4, 0, 2),
 
 ('Diseñar dashboard', 
 'Crear estructura visual del panel administrativo', 
 2, 1, 3),

('Refactorizar repositorios', 
 'Separar lógica de negocio en servicios', 
 3, 0, 3),

('Comprar materiales de estudio', 
 'Adquirir cuadernos y libros de programación', 
 5, 2, 3);

CREATE OR REPLACE VIEW tareasInfo AS
SELECT t.id, t.titulo, t.estado, c.nombre AS categoria, t.created_at, usuario.id
FROM tareas t
JOIN categorias c
ON t.id_categoria = c.id
JOIN usuarios u
ON t.id_usuario = u.id
ORDER BY c.id

SELECT * FROM tareasInfo WHERE id = 


