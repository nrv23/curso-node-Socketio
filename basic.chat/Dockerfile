# Imagen base Node.js Alpine (más ligera y segura)
FROM node:18-alpine

# Metadatos
LABEL maintainer="socketio-course"
LABEL version="1.0"
LABEL description="Entorno seguro para curso Socket.io"

# Crear directorio de la aplicación
WORKDIR /app

# Copiar archivos de dependencias primero (para mejor caching)
COPY package*.json ./

# Instalar dependencias con versiones específicas
RUN npm install --omit=dev

# Copiar el resto del código
COPY . .

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S socketio -u 1001

# Cambiar propietario de archivos
RUN chown -R socketio:nodejs /app

# Cambiar a usuario no-root
USER socketio

# Exponer puerto
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]