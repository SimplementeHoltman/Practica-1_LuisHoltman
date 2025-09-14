# Dockerfile de la app Node.js
FROM node:22-alpine

# Herramienta para healthcheck
RUN apk add --no-cache curl

WORKDIR /usr/src/app

# Copia solo package.json (evita problemas de lock desincronizado)
COPY package.json ./

# Instalación fresca (sin lockfile)
RUN npm install

# Copia el resto del código
COPY . .

EXPOSE 3000
CMD ["npm", "start"]
