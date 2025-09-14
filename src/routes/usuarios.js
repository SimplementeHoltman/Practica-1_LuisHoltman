const express = require("express");
const pool = require("../db");

const router = express.Router();

// GET para listar todos los usuarios
router.get("/", async (_req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM usuario ORDER BY id_usuario");
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

// GET para encontrar un usuario por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query("SELECT * FROM usuario WHERE id_usuario = $1", [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
});

// POST para crear un nuevo usuario
router.post("/", async (req, res) => {
    const { correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, descripcion } = req.body;
    try {
        const { rows } = await pool.query(
            `INSERT INTO usuario (correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, descripcion)
             VALUES ($1, $2, $3, $4, $5::date, $6, $7) RETURNING *`,
            [correo, contrasena, nombre, apellido, fecha_nacimiento, telefono, descripcion]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
});

// DELETE para eliminar un usuario por ID
router.delete("/:id", async (req, res) => {
    try {
        const { rowCount } = await pool.query("DELETE FROM usuario WHERE id_usuario = $1", [req.params.id]);
        if (rowCount === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json({ exitoso: "usuario eliminado con exito" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
});

module.exports = router;
