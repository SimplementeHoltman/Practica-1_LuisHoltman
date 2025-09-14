const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();

const app = express();
app.use(express.json());

const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Si tu server vive en src/index.js y el YAML está en src/docs/openapi.yaml:
const swaggerPath = path.join(__dirname, 'docs/openapi.yaml');
const swaggerDoc = YAML.load(swaggerPath);

console.log('Swagger file:', swaggerPath); // debug
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc, { explorer: true }));


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