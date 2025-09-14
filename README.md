# Práctica 1 – Express API + PostgreSQL

API en **Node.js/Express** con base de datos **PostgreSQL**. Permite:

* Crear usuarios e iniciar sesión.
* Crear blogs y publicar mensajes cortos (con fecha/hora).
* Seguir/dejar de seguir usuarios y ver mensajes de seguidos.
* Listar y buscar mensajes por coincidencia de texto.
* Eliminar usuarios (borra en cascada sus mensajes/blogs).

## Estructura

```
.
├─ src/
│  ├─ index.js
│  ├─ db.js
│  └─ routes/
│     ├─ usuarios.js
│     ├─ sesion.js
│     ├─ blogs.js
│     ├─ mensajes.js
│     └─ seguimientos.js
├─ db/
│  └─ init/
│     ├─ 01_schema.sql
│     └─ 02_data.sql
├─ Dockerfile
├─ docker-compose.yml
├─ .env.example
├─ .env
├─ package.json
└─ README.md
```

## Variables de entorno

Crea tu `.env` (puedes partir de `.env.example`):

```env
# App
PORT=3000

# DB (desde la app)
DB_HOST=db           # en local sin Docker, usa: localhost
DB_PORT=5432
DB_NAME=appdb
DB_USER=appuser
DB_PASSWORD=apppass
```

> En **Docker**, `DB_HOST=db` (nombre del servicio).
> En **local sin Docker**, cambia a `DB_HOST=localhost` (o la IP/host de tu Postgres).

---

# Ejecutar con Docker

## 1) Preparar entorno

```bash
cp .env.example .env
# ajusta si lo necesitas
```

## 2) Levantar servicios

```bash
docker compose up -d --build
```

* **Servicios:**

  * `db` → PostgreSQL 16

    * Puertos expuestos: `5432:5432` **y** `5433:5432` (puedes usar cualquiera de los dos en tu host).
    * Volumen de datos: `db_data` (persistente).
    * Scripts de inicio: monta `./db/init` en `/docker-entrypoint-initdb.d` y **solo se ejecutan la primera vez** que se crea el volumen.
  * `app` → API Node.js (expuesta en `http://localhost:3000`)

## 3) Logs y verificación

```bash
docker compose ps
docker compose logs -f app
curl -s http://localhost:3000/usuarios
```

## 4) Conectarte al Postgres del contenedor

```bash
# Shell psql dentro del contenedor
docker compose exec db psql -U appuser -d appdb

# Atajo para listar tablas
docker compose exec db psql -U appuser -d appdb -c "\dt"
```

## 5) Resetear la base/seeds

Si cambiaste los .sql o quieres re-aplicar `db/init/*.sql`:

```bash
# Esto borra los datos de Postgres del proyecto
docker compose down -v
docker compose up -d --build
```

---

# Ejecutar sin Docker (local)

## Requisitos

* Node.js 22+ y npm.
* PostgreSQL 16+.

## 1) Crear DB y usuario en Postgres local

En tu Postgres local:

```sql
-- Conéctate como superusuario (p. ej., postgres)
CREATE DATABASE appdb;
CREATE USER appuser WITH PASSWORD 'apppass';
GRANT ALL PRIVILEGES ON DATABASE appdb TO appuser;
```

Aplica el esquema:

```bash
# Reemplaza ruta si usas otro psql
psql -U appuser -d appdb -h localhost -f db/init/01_schema.sql
```

## 2) Configurar .env para local

Edita `.env` con:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=appdb
DB_USER=appuser
DB_PASSWORD=apppass
```

## 3) Instalar deps y correr

```bash
npm install
npm run dev
```

Verifica:

```bash
curl -s http://localhost:3000/usuarios
```

---

# Comprobaciones

```bash
# API viva
curl -i http://localhost:3000/usuarios

# Conectividad DB (Docker)
docker compose exec db psql -U appuser -d appdb -c "SELECT now();"

# Ver tablas
docker compose exec db psql -U appuser -d appdb -c "\dt"
```