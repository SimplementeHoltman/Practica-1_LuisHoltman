const express = require("express");
const pool = require("../db");

const router = express.Router();

// POST para iniciar sesión
router.post("/", async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const { rows } = await pool.query(
      `SELECT * FROM usuario WHERE correo = $1 AND contrasena = $2`,
      [correo, contrasena]
    );
    if (rows.length === 0) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }
    res.json({ message: "Inicio de sesión exitoso", usuario: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});


module.exports = router;