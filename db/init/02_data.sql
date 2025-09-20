-- Insertar usuarios
INSERT INTO usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, descripcion) VALUES
('juan@example.com', '1234', 'Juan', 'Pérez', '1990-01-01', '555111111', 'Amante de la tecnología'),
('maria@example.com', '1234', 'María', 'López', '1988-05-12', '555222222', 'Me encanta escribir'),
('carlos@example.com', '1234', 'Carlos', 'García', '1995-07-23', '555333333', 'Apasionado del deporte'),
('ana@example.com', '1234', 'Ana', 'Martínez', '1992-03-18', '555444444', 'Fan de los viajes'),
('pedro@example.com', '1234', 'Pedro', 'Ramírez', '1985-11-05', '555555555', 'Cocinero aficionado');

-- Insertar blogs (uno por usuario)
INSERT INTO blog (usuario_id) VALUES
(1),
(2),
(3),
(4),
(5);

-- Mensajes de Juan (usuario_id = 1, blog_id = 1)
INSERT INTO mensaje (usuario_id, blog_id, contenido) VALUES
(1, 1, 'Hola, este es mi primer post'),
(1, 1, 'Estoy aprendiendo SQL'),
(1, 1, 'Me gusta programar en Python'),
(1, 1, 'Hoy es un gran día'),
(1, 1, 'Les comparto un tip de programación'),
(1, 1, '¿Quién más usa PostgreSQL?'),
(1, 1, 'Estoy practicando con bases de datos'),
(1, 1, 'Mis proyectos favoritos son web'),
(1, 1, 'Estoy creando un blog personal'),
(1, 1, 'Me encanta aprender cosas nuevas'),
(1, 1, 'Un mensaje más para completar la docena');

-- Mensajes de María (usuario_id = 2, blog_id = 2)
INSERT INTO mensaje (usuario_id, blog_id, contenido) VALUES
(2, 2, 'Bienvenidos a mi blog'),
(2, 2, 'Hoy quiero hablar de literatura'),
(2, 2, 'Escribí un nuevo cuento'),
(2, 2, 'Me inspira la poesía'),
(2, 2, 'Un libro que recomiendo: Cien años de soledad'),
(2, 2, 'La escritura es un arte'),
(2, 2, 'Estoy preparando una novela'),
(2, 2, 'Me gusta compartir pensamientos'),
(2, 2, 'Hoy reflexioné sobre la vida'),
(2, 2, 'La lectura nos abre mundos'),
(2, 2, 'Gracias por seguirme');

-- Mensajes de Carlos (usuario_id = 3, blog_id = 3)
INSERT INTO mensaje (usuario_id, blog_id, contenido) VALUES
(3, 3, 'Entrené fútbol hoy'),
(3, 3, 'Me gusta correr en la mañana'),
(3, 3, 'El deporte es salud'),
(3, 3, 'Hice 10km en una hora'),
(3, 3, 'Mis rutinas favoritas'),
(3, 3, 'Tips para mantenerse motivado'),
(3, 3, 'El baloncesto también es genial'),
(3, 3, 'Hoy vi un gran partido'),
(3, 3, 'Mi dieta deportiva'),
(3, 3, 'Ejercicios en casa'),
(3, 3, 'Superando mis marcas');

-- Mensajes de Ana (usuario_id = 4, blog_id = 4)
INSERT INTO mensaje (usuario_id, blog_id, contenido) VALUES
(4, 4, 'Mi primer viaje sola'),
(4, 4, 'Recomendaciones para viajar barato'),
(4, 4, 'Cómo organizar un viaje'),
(4, 4, 'Mis destinos favoritos'),
(4, 4, 'Fotos de mi viaje a Italia'),
(4, 4, 'Consejos de seguridad'),
(4, 4, 'Viajar es vivir'),
(4, 4, 'Mochilazo en Sudamérica'),
(4, 4, 'Un día en París'),
(4, 4, 'Cómo aprender idiomas viajando'),
(4, 4, 'Experiencias inolvidables');

-- Mensajes de Pedro (usuario_id = 5, blog_id = 5)
INSERT INTO mensaje (usuario_id, blog_id, contenido) VALUES
(5, 5, 'Hoy hice una paella'),
(5, 5, 'Me encanta la cocina mediterránea'),
(5, 5, 'Receta fácil de pasta'),
(5, 5, 'Cómo hacer pan en casa'),
(5, 5, 'Mis postres favoritos'),
(5, 5, 'Tips de cocina rápida'),
(5, 5, 'La importancia de buenos ingredientes'),
(5, 5, 'Receta de guacamole'),
(5, 5, 'Comida saludable y rica'),
(5, 5, 'Cocinando con amigos'),
(5, 5, 'Explorando nuevos sabores');

-- Seguimientos (relaciones entre usuarios)
INSERT INTO seguimiento (id_seguidor, id_seguido) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 4),
(3, 5),
(4, 1),
(4, 5),
(5, 2),
(5, 3);
