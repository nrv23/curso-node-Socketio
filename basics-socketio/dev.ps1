# Script para desarrollo con hot reload y bind volumes
# Uso: .\dev.ps1

Write-Host "🔥 Iniciando entorno de DESARROLLO con Hot Reload..." -ForegroundColor Cyan

# Navegar al directorio correcto
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Detener contenedores de desarrollo existentes
Write-Host "🛑 Deteniendo contenedores de desarrollo..." -ForegroundColor Yellow
docker-compose -f docker-compose.dev.yml down 2>$null | Out-Null

# Limpiar imágenes de desarrollo
Write-Host "🧹 Limpiando imágenes de desarrollo..." -ForegroundColor Yellow
docker rmi basics-socketio-socketio-dev 2>$null | Out-Null

# Construir y ejecutar en modo desarrollo
Write-Host "🔨 Construyendo imagen de desarrollo..." -ForegroundColor Green
docker-compose -f docker-compose.dev.yml build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Imagen de desarrollo construida!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔥 MODO DESARROLLO ACTIVADO" -ForegroundColor Red
    Write-Host "📱 Aplicación: http://localhost:3000" -ForegroundColor Magenta
    Write-Host "🔄 Hot Reload: ACTIVO" -ForegroundColor Green
    Write-Host "📁 Bind Volume: Código sincronizado en tiempo real" -ForegroundColor Cyan
    Write-Host "⏹️  Para detener: Ctrl+C" -ForegroundColor Yellow
    Write-Host ""
    
    # Abrir navegador
    Start-Process "http://localhost:3000"
    
    # Ejecutar en modo desarrollo
    docker-compose -f docker-compose.dev.yml up
} else {
    Write-Host "❌ Error al construir la imagen de desarrollo" -ForegroundColor Red
    exit 1
}