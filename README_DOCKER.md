# Docker Setup (Frontend + Backend + PostgreSQL)

Este repositorio usa `docker-compose` para levantar tres servicios:

- **frontend**: aplicación Angular compilada y servida por Nginx.
- **backend**: API ASP.NET Core 10.0.
- **postgres**: base de datos PostgreSQL.

## Pasos básicos

```powershell
cd C:\Users\LENOVO\Documents\Proyect\SUB-SUB-SUB\proyect1

# construir imágenes y correr
docker-compose up -d --build

# revisar estado
docker-compose ps
```

Después de ejecutar el build, la imagen del frontend copia los archivos
estáticos desde `dist/Frontend/browser` a `/usr/share/nginx/html` (Nginx sirve
la carpeta `browser`, no el directorio raíz `dist/Frontend` completo).

Si accedes a `http://localhost` y ves la página por defecto de Nginx en vez de
la aplicación Angular, reconstruye la imagen del frontend para asegurarte de
que ese paso se ejecutó:

```powershell
docker-compose build frontend
docker-compose up -d frontend
```

> ❗ El problema más común es que el build de Angular genera dos subdirectorios
> (`browser` y `server`); el Dockerfile original estaba copiando `dist/Frontend`
> en lugar de `dist/Frontend/browser`, así que no existía ningún `index.html`
> en la raíz y Nginx mostraba su mensaje predeterminado.

## Verificar que funciona

- Frontend: `http://localhost` → debería devolver estado 200 y el HTML de la app.
- Backend: `http://localhost:5156` → API ASP.NET.
- PostgreSQL: `localhost:5432` → se puede conectar con `admin/admin123456`.

## Comandos útiles

```powershell
# observar logs
docker-compose logs -f frontend

docker-compose exec frontend ls /usr/share/nginx/html
```

El segundo comando debe listar `index.html` y los JS/CSS generados.

---

Mantén este README en el repositorio para referencia rápida; el script
`docker-utils.ps1` ofrece atajos para arrancar/parar/regenerar imágenes si lo
prefieres.

## Migraciones de Entity Framework y acceso a PostgreSQL

Para crear y aplicar el esquema de usuarios en la base de datos Postgres puedes
utilizar el CLI de `dotnet ef` dentro del contenedor `backend` o dejar que el
propio backend aplique las migraciones automáticamente al arrancar (ya está
habilitado en `Program.cs`).

Comandos manuales (opcionales):

```powershell
# crear una migración (ejecutar desde la raíz del proyecto)
docker-compose exec backend dotnet ef migrations add InitialUsers --project /app/src/Proyect1.csproj --startup-project /app/src/Proyect1.csproj

# aplicar migraciones a la BD
docker-compose exec backend dotnet ef database update --project /app/src/Proyect1.csproj --startup-project /app/src/Proyect1.csproj
```

Si prefieres abrir una consola SQL dentro del contenedor Postgres:

```powershell
docker-compose exec postgres psql -U admin -d proyect1_db
```

Ejemplos SQL:

```sql
SELECT * FROM "Users";
INSERT INTO "Users"("Name","Email","Role") VALUES('Ana','a@a.com','admin');
```

Notas:
- El backend expone la API REST en `/api/users` con métodos GET, POST, PUT, DELETE.
- El frontend ya consume `/api/users` y muestra/edita el campo `role`.
