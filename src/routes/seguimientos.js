const express  = require("express");
const pool = require("../db");

const router = express.Router();

// GET para listar todos los seguimientos
router.get("/", async (_req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT usuario.nombre AS seguidor_nombre, usuario.apellido AS seguidor_apellido,
                   seguido.nombre AS seguido_nombre, seguido.apellido AS seguido_apellido
            FROM seguimiento
            JOIN usuario ON seguimiento.id_seguidor = usuario.id_usuario
            JOIN usuario AS seguido ON seguimiento.id_seguido = seguido.id_usuario
            ORDER BY seguimiento.id_seguidor, seguimiento.id_seguido
            `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener los seguimientos" });
    }
});

// get para listar mensajes de usuarios seguidos por un usuario
router.get("/mensajes/:id_seguidor", async (req, res) => {
    const { id_seguidor } = req.params;
    try {
        const { rows } = await pool.query(
            `SELECT usuario.nombre, usuario.apellido, blog.id_blog, mensaje.contenido, mensaje.fecha_publicacion
             FROM seguimiento
             JOIN usuario ON seguimiento.id_seguido = usuario.id_usuario
             JOIN mensaje ON mensaje.usuario_id = usuario.id_usuario
             JOIN blog ON mensaje.blog_id = blog.id_blog
             WHERE seguimiento.id_seguidor = $1
             ORDER BY mensaje.fecha_publicacion DESC
             `,
            [id_seguidor]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener los mensajes de los usuarios seguidos" });
    }
});

// POST para crear un nuevo seguimiento 
router.post("/", async (req, res) => {
    const { id_seguidor, id_seguido } = req.body;
    try {
        const { rows } = await pool.query(
            `INSERT INTO seguimiento (id_seguidor, id_seguido)
             VALUES ($1, $2) RETURNING *`,
            [id_seguidor, id_seguido]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al crear el seguimiento" });
    }
});

// DELETE para eliminar un seguimiento por id_seguidor e id_seguido
router.delete("/", async (req, res) => {
    const { id_seguidor, id_seguido } = req.body;
    try {
        const { rowCount } = await pool.query(
            "DELETE FROM seguimiento WHERE id_seguidor = $1 AND id_seguido = $2",
            [id_seguidor, id_seguido]
        );
        if (rowCount === 0) {
            return res.status(404).json({ error: "Seguimiento no encontrado" });
        }
        res.json({ ok: "true" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al eliminar el seguimiento" });
    }
});

module.exports = router;