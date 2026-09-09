# ============================================
# STAGE 1: BUILD
# ============================================
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copiar archivos de proyecto y restaurar dependencias
COPY FlowBoard.API/*.csproj ./FlowBoard.API/
WORKDIR /app/FlowBoard.API
RUN dotnet restore

# Copiar el resto del código
WORKDIR /app
COPY FlowBoard.API/. ./FlowBoard.API/

# Publicar la aplicación
WORKDIR /app/FlowBoard.API
RUN dotnet publish -c Release -o /app/publish

# ============================================
# STAGE 2: RUNTIME
# ============================================
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Instalar curl para health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Copiar la publicación
COPY --from=build /app/publish .

# Crear directorio para logs
RUN mkdir -p /app/logs

# Variables de entorno
ENV ASPNETCORE_ENVIRONMENT=Docker
ENV ASPNETCORE_URLS=http://+:5000

# Exponer puertos
EXPOSE 5000
EXPOSE 5001

# Health check
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Entry point
ENTRYPOINT ["dotnet", "FlowBoard.API.dll"]