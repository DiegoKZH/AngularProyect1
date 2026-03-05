# Script de Utilidad para Desarrollo Local con Docker
# Ejecuta solo PostgreSQL en Docker, mientras Backend y Frontend corren localmente
# Uso: .\dev-local.ps1 -Action [start|stop|logs|shell-db|status|clean]

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet('start', 'stop', 'logs', 'shell-db', 'status', 'clean', 'backup', 'restore')]
    [string]$Action = 'start'
)

$COMPOSE_FILE = "docker-compose.local.yml"

function Start-Database {
    Write-Host "🚀 Iniciando PostgreSQL en Docker..." -ForegroundColor Green
    docker-compose -f $COMPOSE_FILE up -d
    Write-Host "✅ PostgreSQL iniciado" -ForegroundColor Green
    Write-Host "📍 PostgreSQL disponible en: localhost:5432" -ForegroundColor Cyan
    Write-Host "   Usuario: admin" -ForegroundColor Cyan
    Write-Host "   Contraseña: admin123456" -ForegroundColor Cyan
    Write-Host "   Base de datos: proyect1_db" -ForegroundColor Cyan
    Write-Host "" -ForegroundColor Cyan
    Write-Host "💡 Ahora puedes iniciar el Backend y Frontend localmente:" -ForegroundColor Yellow
    Write-Host "   Backend: cd Backend && dotnet run" -ForegroundColor Yellow
    Write-Host "   Frontend: cd Frontend && npm start (o ng serve)" -ForegroundColor Yellow
}

function Stop-Database {
    Write-Host "🛑 Deteniendo PostgreSQL..." -ForegroundColor Yellow
    docker-compose -f $COMPOSE_FILE stop
    Write-Host "✅ PostgreSQL detenido" -ForegroundColor Green
}

function Show-Logs {
    Write-Host "📋 Mostrando logs de PostgreSQL (Ctrl+C para salir)..." -ForegroundColor Cyan
    docker-compose -f $COMPOSE_FILE logs -f postgres
}

function Show-Status {
    Write-Host "📊 Estado de los servicios:" -ForegroundColor Cyan
    docker-compose -f $COMPOSE_FILE ps
}

function Shell-Database {
    Write-Host "🐘 Conectando a PostgreSQL..." -ForegroundColor Cyan
    docker-compose -f $COMPOSE_FILE exec postgres psql -U admin -d proyect1_db
}

function Clean-Database {
    Write-Host "🗑️  Eliminando contenedor y volúmenes de PostgreSQL..." -ForegroundColor Yellow
    $confirmation = Read-Host "⚠️  ¿Estás seguro? Los datos de la BD se perderán (S/N)"
    
    if ($confirmation -eq 'S' -or $confirmation -eq 's') {
        docker-compose -f $COMPOSE_FILE down -v
        Write-Host "✅ Limpieza completada" -ForegroundColor Green
    } else {
        Write-Host "❌ Operación cancelada" -ForegroundColor Red
    }
}

function Backup-Database {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupFile = "proyect1_db_backup_$timestamp.sql"
    
    Write-Host "💾 Creando backup de la base de datos..." -ForegroundColor Cyan
    docker-compose -f $COMPOSE_FILE exec -T postgres pg_dump -U admin proyect1_db > $backupFile
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Backup creado: $backupFile" -ForegroundColor Green
    } else {
        Write-Host "❌ Error al crear el backup" -ForegroundColor Red
    }
}

function Restore-Database {
    $backupFile = Read-Host "Introduce la ruta del archivo de backup"
    
    if (-not (Test-Path $backupFile)) {
        Write-Host "❌ Archivo no encontrado: $backupFile" -ForegroundColor Red
        return
    }
    
    Write-Host "⏳ Restaurando la base de datos desde: $backupFile" -ForegroundColor Yellow
    Get-Content $backupFile | docker-compose -f $COMPOSE_FILE exec -T postgres psql -U admin proyect1_db
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Base de datos restaurada exitosamente" -ForegroundColor Green
    } else {
        Write-Host "❌ Error al restaurar la base de datos" -ForegroundColor Red
    }
}

# Ejecutar acción
switch ($Action) {
    'start' { Start-Database }
    'stop' { Stop-Database }
    'logs' { Show-Logs }
    'status' { Show-Status }
    'shell-db' { Shell-Database }
    'clean' { Clean-Database }
    'backup' { Backup-Database }
    'restore' { Restore-Database }
}
