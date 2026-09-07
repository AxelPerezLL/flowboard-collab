# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./
RUN npm ci

# Copiar código fuente
COPY . .

# Construir la aplicación con variables de entorno
ARG VITE_API_URL
ARG VITE_SIGNALR_URL
ARG VITE_APP_NAME

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SIGNALR_URL=$VITE_SIGNALR_URL
ENV VITE_APP_NAME=$VITE_APP_NAME

RUN npm run build

# Stage 2: Servir con Nginx
FROM nginx:alpine AS runtime

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar el build
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]