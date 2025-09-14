const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
app.use(express.json());


// Rutas
const usuariosRouter = require('./routes/usuarios');
const blogsRouter = require('./routes/blogs');
const mensajesRouter = require('./routes/mensajes');
const seguimientosRouter = require('./routes/seguimientos');
const sesionRouter = require('./routes/sesion');
  
app.use('/usuarios', usuariosRouter);
app.use('/blogs', blogsRouter);
app.use('/mensajes', mensajesRouter);
app.use('/seguimientos', seguimientosRouter);
app.use('/sesion', sesionRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


module.exports = app;