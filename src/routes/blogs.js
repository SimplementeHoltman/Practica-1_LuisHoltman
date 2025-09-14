const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET para blog

router.get("/", async (_req, res) => {
    try {
        const { rows } = await pool.query(`
            SELECT blog.*, usuario.nombre, usuario.apellido
            FROM blog
            JOIN usuario ON blog.usuario_id = usuario.id_usuario
            ORDER BY blog.id_blog
        `);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener los blogs" });
    }
});

// POST para crear un nuevo blog
router.post("/", async (req, res) => {
    const { usuario_id } = req.body;
    try {
        const { rows } = await pool.query(
            `INSERT INTO blog (usuario_id)
             VALUES ($1) RETURNING *`,
            [usuario_id]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al crear el blog" });
    }
});

// DELETE para eliminar un blog por ID
router.delete("/:id_blog", async (req, res) => {
    try {
        const { rowCount } = await pool.query("DELETE FROM blog WHERE id_blog = $1", [req.params.id_blog]);
        if (rowCount === 0) {
            return res.status(404).json({ error: "Blog no encontrado" });
        }
        res.json({ ok: "true" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al eliminar el blog" });
    }
});

module.exports = router;