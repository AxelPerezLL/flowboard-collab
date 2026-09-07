## 📖 Descripción

FlowBoard Collab es una aplicación web que permite a equipos pequeños organizar sus proyectos de manera visual, asignar tareas y hacer seguimiento del progreso en tiempo real.
## ✨ Características

- 🔐 **Autenticación JWT**: Registro y login seguro con tokens


  
Consume API REST
│
▼
┌─────────────────────────────────────────────────────────────────┐
│ BACKEND (.NET 8 Web API) │
│ - API REST con autenticación JWT │
│ - SignalR para tiempo real │
│ - Lógica de negocio y validaciones │
└─────────────────────────────────────────────────────────────────┘
│
Accede a BD
▼
┌─────────────────────────────────────────────────────────────────┐
│ BASE DE DATOS (MariaDB) │

│ - Almacena: Usuarios, Tableros, Columnas, Tarjetas, etc. │
│ - Entity Framework Core para acceso a datos │
│ - Migraciones para control de versiones de BD │


## 🛠️ Tecnologías

### Backend
- **.NET 8** - Framework principal
- **Entity Framework Core 8** - ORM para base de datos
- **MariaDB 11.3** - Base de datos relacional
- **JWT** - Autenticación basada en tokens
- **BCrypt** - Hash de contraseñas
- **Swagger** - Documentación de API
- **SignalR** - Comunicación en tiempo real

### Infraestructura
- **Docker** - Contenedores
- **Docker Compose** - Orquestación
- **Redis** - Caché y backplane de SignalR

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/downloads)

### Verificar instalación

```bash
# Verificar .NET
dotnet --version
# Debería mostrar: 8.0.x

# Verificar Docker
docker --version
docker-compose --version

# Verificar Git
git --version
