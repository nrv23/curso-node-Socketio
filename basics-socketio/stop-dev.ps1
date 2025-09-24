# Script para detener el entorno de desarrollo
# Uso: .\stop-dev.ps1

Write-Host "🛑 Deteniendo entorno de desarrollo..." -ForegroundColor Yellow

# Navegar al directorio correcto
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Detener servicios de desarrollo
docker-compose -f docker-compose.dev.yml down

Write-Host "✅ Entorno de desarrollo detenido" -ForegroundColor Green
Write-Host "ℹ️  Para volver a iniciar: .\dev.ps1" -ForegroundColor Cyan