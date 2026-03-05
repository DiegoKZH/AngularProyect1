# Desarrollo Local con Docker (Solo PostgreSQL)

Esta guía te ayuda a desarrollar localmente ejecutando solo PostgreSQL en Docker, mientras que Backend y Frontend corren directamente en tu máquina.

## 🎯 Configuración recomendada

### Opción 1: Solo PostgreSQL en Docker (Recomendado)
Levanta únicamente la base de datos en Docker y ejecuta Backend + Frontend localmente. Esto es más rápido y facilita el debugging.

**Ventajas:**
- Mejor rendimiento
- Debugging más sencillo (breakpoints, logs en tiempo real)
- Recarga rápida con `dotnet watch run`
- IDE completamente integrado

**Pasos:**

1. **Inicia PostgreSQL en Docker:**
   ```powershell
   .\dev-local.ps1 -Action start
   ```
   Esto levantará solo el contenedor de PostgreSQL (proyect1_postgres_local)

2. **En una nueva terminal, inicia el Backend:**
   ```powershell
   cd Backend
   dotnet run
   ```
   Esto ejecutará en modo Development y se conectará a PostgreSQL en localhost:5432

3. **En otra terminal, inicia el Frontend:**
   ```powershell
   cd Frontend
   npm start
   # o si usas Angular CLI
   ng serve --open
   ```

4. **Accede a la aplicación:**
   - Frontend: http://localhost:4200 (Angular Dev Server)
   - Backend API: http://localhost:5156

---

## 📋 Comandos disponibles

### Iniciar solo PostgreSQL
```powershell
.\dev-local.ps1 -Action start
```

### Detener PostgreSQL
```powershell
.\dev-local.ps1 -Action stop
```

### Ver logs de PostgreSQL
```powershell
.\dev-local.ps1 -Action logs
```

### Ver estado
```powershell
.\dev-local.ps1 -Action status
```

### Conectarse a PostgreSQL interactivamente
```powershell
.\dev-local.ps1 -Action shell-db
```
Esto abre una sesión psql donde puedes ejecutar comandos SQL directamente.

### Crear backup de la base de datos
```powershell
.\dev-local.ps1 -Action backup
```
Se creará un archivo `proyect1_db_backup_YYYYMMDD_HHmmss.sql`

### Restaurar backup
```powershell
.\dev-local.ps1 -Action restore
```

### Limpiar todo (elimina contenedor y datos)
```powershell
.\dev-local.ps1 -Action clean
```

---

## 🔧 Configuración de conexión

El archivo `Backend/appsettings.Development.json` ya está configurado para conectarse a `localhost`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=proyect1_db;Username=admin;Password=admin123456;"
  }
}
```

Si usas otra configuración, actualiza esta cadena de conexión.

---

## 🚀 Flujo de desarrollo típico

1. Abre 3 terminales:
   ```
   Terminal 1: .\dev-local.ps1 -Action start
   Terminal 2: cd Backend && dotnet run
   Terminal 3: cd Frontend && npm start
   ```

2. Haz cambios en cualquiera de los archivos

3. Backend se recargará automáticamente (dotnet watch run)
4. Frontend se recargará automáticamente (Angular dev server)

5. Debuggea directamente desde VS Code

---

## 💡 Alternativa: Todo en Docker

Si prefieres ejecutar todo en Docker, usa el `docker-compose.yml` o `docker-compose.dev.yml`:

```powershell
docker-compose -f docker-compose.dev.yml up
```

**Nota:** Esto ejecutará Backend y Frontend dentro de contenedores, lo que facilita replicar el entorno de producción pero complica el debugging.

---

## 🐘 Credenciales de PostgreSQL

- **Host:** localhost
- **Puerto:** 5432
- **Usuario:** admin
- **Contraseña:** admin123456
- **Base de datos:** proyect1_db

---

## 📝 Migración de datos

Cuando ejecutes el Backend, las migraciones se aplicarán automáticamente:

```csharp
// Program.cs ya contiene:
using var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
db.Database.Migrate();
```

Si necesitas aplicar migraciones manualmente:

```powershell
cd Backend
dotnet ef database update
```

---

## ❌ Solución de problemas

### "No se puede conectar a PostgreSQL"
- Verifica que el contenedor está corriendo: `.\dev-local.ps1 -Action status`
- Verifica el puerto 5432 esté libre
- Intenta detener e iniciar de nuevo: `.\dev-local.ps1 -Action stop && .\dev-local.ps1 -Action start`

### "Puerto 5432 ya está en uso"
Detecta qué está usando el puerto:
```powershell
netstat -ano | findstr :5432
```

Puedes cambiar el puerto en `docker-compose.local.yml` (primera línea es el puerto host):
```yaml
ports:
  - "5433:5432"  # Ahora usa puerto 5433 localmente
```
Y actualiza la cadena de conexión en `appsettings.Development.json`.

### "Base de datos o tablas no existen"
Las migraciones se aplican automáticamente al iniciar el Backend, pero si necesitas crearlas manualmente:
```powershell
cd Backend
dotnet ef database update
```

---

## 🔄 Cambiar entre configuraciones

Usa `launchSettings.json` para cambiar entre Development y Production:

```powershell
# Development (por defecto)
dotnet run

# Production (requiere cambios en appsettings.json)
dotnet run --configuration Release
```

