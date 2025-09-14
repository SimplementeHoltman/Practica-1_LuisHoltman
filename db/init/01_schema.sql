CREATE TABLE usuario (
  id_usuario       SERIAL PRIMARY KEY,
  correo           TEXT NOT NULL,
  contrasena       TEXT NOT NULL,
  nombre           TEXT NOT NULL,
  apellido         TEXT NOT NULL,
  fecha_nacimiento DATE NOT NULL,
  telefono         TEXT,
  descripcion      TEXT
);

CREATE TABLE blog (
  id_blog    SERIAL PRIMARY KEY,
  usuario_id INT NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

CREATE TABLE mensaje (
  id_mensaje        SERIAL PRIMARY KEY,
  usuario_id        INT NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  blog_id           INT NOT NULL REFERENCES blog(id_blog) ON DELETE CASCADE,
  contenido         TEXT NOT NULL,
  fecha_publicacion TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE seguimiento (
  id_seguidor INT NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  id_seguido  INT NOT NULL REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  PRIMARY KEY (id_seguidor, id_seguido)
);
