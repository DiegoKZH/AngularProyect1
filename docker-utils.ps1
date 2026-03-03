# Script de Utilidad para Docker Compose
# Uso: .\docker-utils.ps1 -Action [start|stop|logs|rebuild|clean|status]

param(
    [Parameter(Mandatory=$false)]
    [ValidateSet('start', 'stop', 'logs', 'rebuild', 'clean', 'status', 'shell-backend', 'shell-db')]
    [string]$Action = 'start'
)

function Start-Project {
    Write-Host "🚀 Iniciando servicios..." -ForegroundColor Green
    docker-compose up -d
    Write-Host "✅ Servicios iniciados" -ForegroundColor Green
    Write-Host "📍 Frontend: http://localhost" -ForegroundColor Cyan
    Write-Host "📍 Backend: http://localhost:5156" -ForegroundColor Cyan
}

function Stop-Project {
    Write-Host "🛑 Deteniendo servicios..." -ForegroundColor Yellow
    docker-compose stop
    Write-Host "✅ Servicios detenidos" -ForegroundColor Green
}

function Show-Logs {
    Write-Host "📋 Mostrando logs (Ctrl+C para salir)..." -ForegroundColor Cyan
    docker-compose logs -f
}

function Rebuild-Project {
    Write-Host "🔨 Reconstruyendo servicios..." -ForegroundColor Yellow
    docker-compose up -d --build
    Write-Host "✅ Servicios reconstruidos" -ForegroundColor Green
}

function Clean-Project {
    Write-Host "🗑️  Eliminando contenedores y volúmenes..." -ForegroundColor Yellow
    $confirmation = Read-Host "¿Estás seguro? Los datos de la BD se perderán (S/N)"
    
    if ($confirmation -eq 'S' -or $confirmation -eq 's') {
        docker-compose down -v
        Write-Host "✅ Limpieza completada" -ForegroundColor Green
    } else {
        Write-Host "❌ Operación cancelada" -ForegroundColor Red
    }
}

function Show-Status {
    Write-Host "📊 Estado de los servicios:" -ForegroundColor Cyan
    docker-compose ps
}

function Shell-Backend {
    Write-Host "🐚 Entrando a la shell del backend..." -ForegroundColor Cyan
    docker-compose exec backend bash
}

function Shell-Database {
    Write-Host "🐘 Conectando a PostgreSQL..." -ForegroundColor Cyan
    docker-compose exec postgres psql -U admin -d proyect1_db
}

# Ejecutar acción
switch ($Action) {
    'start' { Start-Project }
    'stop' { Stop-Project }
    'logs' { Show-Logs }
    'rebuild' { Rebuild-Project }
    'clean' { Clean-Project }
    'status' { Show-Status }
    'shell-backend' { Shell-Backend }
    'shell-db' { Shell-Database }
}
