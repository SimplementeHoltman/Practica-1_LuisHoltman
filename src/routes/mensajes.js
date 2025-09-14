const express = require("express");
const pool = require("../db");

const router = express.Router();

// get mensaje por id
router.get("/:id_mensaje", async (req, res) => {
  const { id_mensaje } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT usuario.nombre, usuario.apellido, blog.id_blog, mensaje.contenido
       FROM mensaje
       JOIN usuario ON mensaje.usuario_id = usuario.id_usuario
       JOIN blog ON mensaje.blog_id = blog.id_blog
       WHERE mensaje.id_mensaje = $1`,
      [id_mensaje]
    );
    if (rows.length === 0) {
      return res.status(404).json({ error: "Mensaje no encontrado" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener el mensaje" });
  }
});

// get por coicidencia de texto en contenido
router.get("/buscar/:query", async (req, res) => {
  const { query } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT usuario.nombre, usuario.apellido, blog.id_blog, mensaje.contenido
       FROM mensaje
       JOIN usuario ON mensaje.usuario_id = usuario.id_usuario
       JOIN blog ON mensaje.blog_id = blog.id_blog
       WHERE mensaje.contenido ILIKE $1
       ORDER BY mensaje.id_mensaje`,
      [`%${query}%`]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar mensajes" });
  }
});

// get de los ultimos 10 mensajes de un usuario
router.get("/usuario/:usuario_id", async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const { rows } = await pool.query(
      `SELECT usuario.nombre, usuario.apellido, blog.id_blog, mensaje.contenido, mensaje.fecha_publicacion
       FROM mensaje
       JOIN usuario ON mensaje.usuario_id = usuario.id_usuario
       JOIN blog ON mensaje.blog_id = blog.id_blog
       WHERE usuario.id_usuario = $1
       ORDER BY mensaje.fecha_publicacion DESC
       LIMIT 10`,
      [usuario_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener mensajes del usuario" });
  }
});


// POST para crear un nuevo mensaje
router.post("/", async (req, res) => {
  const { usuario_id, blog_id, contenido } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO mensaje (usuario_id, blog_id, contenido)
       VALUES ($1, $2, $3) RETURNING *`,
      [usuario_id, blog_id, contenido]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear el mensaje" });
  }
});

// DELETE para eliminar un mensaje por ID
// esto no es parte del requerimiento pero es util para pruebas (borrar antes de la entrega final)
router.delete("/:id_mensaje", async (req, res) => {
  try {
    const { rowCount } = await pool.query(
      "DELETE FROM mensaje WHERE id_mensaje = $1",
      [req.params.id_mensaje]
    );
    if (rowCount === 0) {
      return res.status(404).json({ error: "Mensaje no encontrado" });
    }
    res.json({ ok: "true" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar el mensaje" });
  }
});

module.exports = router;
