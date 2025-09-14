## 1. Levantar el proyecto **desde cero**

Cuando aún no tienes contenedores creados o quieres reconstruir todo:

```bash
# 1. Ve a la carpeta del proyecto
cd /home/luis-holtman/Proyectos/practica1_luisholtman

# 2. Construir e iniciar los contenedores
docker compose up -d --build

# 3. Ver logs iniciales (opcional, para debuggear)
docker compose logs -f

# 4. Verifica que estén corriendo
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# 5. Probar endpoints básicos
curl -s http://localhost:3000/health
curl -s http://localhost:3000/db-check
```

---

## 2. Levantar el proyecto **cuando ya está creado**

Si los contenedores y volúmenes ya existen:

```bash
# Levantar (sin rebuild)
docker compose up -d

# Ver logs en tiempo real
docker compose logs -f practica1_api
docker compose logs -f practica1_db
```

---

## 3. Apagar el proyecto

```bash
# Apagar sin borrar nada
docker compose down

# Apagar y borrar volúmenes (ojo: borra datos de la DB)
docker compose down -v
```

---

## 4. Apagar Docker completo

Esto apaga **todo el servicio Docker en tu PC** (no solo tu proyecto):

```bash
# Apagar Docker
sudo systemctl stop docker

# Encender Docker
sudo systemctl start docker

# Reiniciar Docker
sudo systemctl restart docker
```

---

## 5. Comandos útiles para el día a día

```bash
# Listar contenedores corriendo
docker ps

# Listar TODOS los contenedores (incluidos apagados)
docker ps -a

# Ver logs de un contenedor
docker logs -f practica1_api

# Entrar al contenedor de la base de datos
docker exec -it practica1_db psql -U appuser -d appdb

# Ejecutar un script SQL en la base de datos
docker exec -i practica1_db psql -U appuser -d appdb -f /docker-entrypoint-initdb.d/01_schema.sql

# Listar imágenes locales
docker images

# Listar volúmenes
docker volume ls

# Limpiar contenedores detenidos
docker container prune -f

# Limpiar imágenes sin uso
docker image prune -a -f

# Limpiar volúmenes sin uso
docker volume prune -f
```
