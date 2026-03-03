# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar código fuente
COPY . .

# Build de Angular
RUN npm run build

# Etapa 2: Nginx (Servir la aplicación)
FROM nginx:alpine

# Copy our nginx.conf into the templates directory so the official entrypoint
# can perform variable substitution at container startup.
# It will write the result to /etc/nginx/conf.d/nginx.conf which is included by
# the default main configuration.
COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY --from=build /app/dist/Frontend/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
