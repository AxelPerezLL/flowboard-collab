# FlowBoard Collab

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![.NET](https://img.shields.io/badge/.NET-8.0-purple)](https://dotnet.microsoft.com/)
[![React](https://img.shields.io/badge/React-18.0-blue)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-24.0-blue)](https://www.docker.com/)

> **English** | [Español](#español)

---

## English 🇬🇧

### 📋 Description

**FlowBoard Collab** is a collaborative task management platform inspired by Trello. Built as a full-stack application with modern technologies, it allows teams to organize work visually using Kanban boards, with real-time collaboration features.

### 🎯 Key Features

#### Core Functionality
- **Kanban Boards**: Drag & drop cards between columns
- **Team Management**: Create teams, invite members, assign roles (Admin/Member/Viewer)
- **Real-time Updates**: Instant notifications when cards move or comments are added
- **Task Details**: Comments, checklists, attachments, labels, and due dates
- **Dashboard**: Statistics and KPIs with interactive charts
- **User Profiles**: Avatars, bios, and activity history

#### Technical Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite, Tailwind CSS, Shadcn/ui |
| **State Management** | TanStack Query, React Context |
| **Backend** | .NET 8, ASP.NET Core Web API |
| **Database** | MariaDB 11.2, Entity Framework Core |
| **Real-time** | SignalR (WebSockets) |
| **Storage** | MinIO (S3-compatible) for file attachments |
| **Cache** | Redis |
| **Containerization** | Docker & Docker Compose |
| **CI/CD** | GitHub Actions |

### 🚀 Quick Start

#### Prerequisites
- Docker & Docker Compose
- Git
- Node.js 20+ (for local development)
- .NET 8 SDK (for local development)

#### Running with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/flowboard-collab.git
cd flowboard-collab

# Copy environment variables
cp .env.example .env

# Start all services
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# API Docs: http://localhost:5000/swagger
# MinIO Console: http://localhost:9001

Local Development

Backend (.NET):
bash

cd backend
dotnet restore
dotnet ef database update
dotnet run

Frontend (React):
bash

cd frontend
npm install
npm run dev

📁 Project Structure
text

flowboard-collab/
├── backend/
│   ├── Controllers/          # API endpoints
│   ├── Models/               # Domain entities
│   ├── Data/                 # DbContext & migrations
│   ├── Services/             # Business logic
│   ├── Hubs/                 # SignalR hubs
│   └── Program.cs            # Application entry point
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Application pages
│   │   ├── hooks/            # Custom React hooks
│   │   ├── services/         # API integration
│   │   └── contexts/         # React contexts (auth, theme)
│   ├── public/
│   └── package.json
├── docker-compose.yml        # Multi-container orchestration
├── .env.example              # Environment variables template
└── README.md

🐳 Docker Services
Service	Port	Description
Frontend	3000	React application
Backend API	5000	.NET Core API
MariaDB	3306	Primary database
Redis	6379	Caching & SignalR backplane
MinIO	9000/9001	S3-compatible file storage
🤝 Contributing

    Fork the repository

    Create a feature branch: git checkout -b feature/amazing-feature

    Commit your changes: git commit -m 'feat: add amazing feature'

    Push to the branch: git push origin feature/amazing-feature

    Open a Pull Request

Commit Convention

We use Conventional Commits:

    feat: New feature

    fix: Bug fix

    docs: Documentation

    style: Code style changes

    refactor: Code refactoring

    test: Testing

    chore: Maintenance tasks

📊 API Documentation

Once the backend is running, visit: http://localhost:5000/swagger
🔒 Environment Variables

Copy .env.example to .env and configure:
env

# Database
DB_ROOT_PASSWORD=root123
DB_NAME=flowboard
DB_USER=flowboard_user
DB_PASSWORD=secure_password

# Backend
ASPNETCORE_ENVIRONMENT=Development
DB_CONNECTION_STRING=Server=mariadb;Database=flowboard;User=root;Password=root123;Port=3306
JWT_SECRET_KEY=your_super_secret_key_min_32_chars

# Frontend
VITE_API_URL=http://localhost:5000/api
VITE_SIGNALR_URL=http://localhost:5000/hub

# MinIO Storage
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin123

📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
Español 🇪🇸
📋 Descripción

FlowBoard Collab es una plataforma colaborativa de gestión de tareas inspirada en Trello. Construida como una aplicación full-stack con tecnologías modernas, permite a los equipos organizar el trabajo visualmente usando tableros Kanban, con funcionalidades de colaboración en tiempo real.
🎯 Características Principales
Funcionalidades Centrales

    Tableros Kanban: Arrastra y suelta tarjetas entre columnas

    Gestión de Equipos: Crea equipos, invita miembros, asigna roles (Admin/Miembro/Espectador)

    Actualizaciones en Tiempo Real: Notificaciones instantáneas al mover tarjetas o añadir comentarios

    Detalle de Tareas: Comentarios, checklists, adjuntos, etiquetas y fechas de vencimiento

    Dashboard: Estadísticas y KPIs con gráficos interactivos

    Perfiles de Usuario: Avatares, biografías e historial de actividad

Stack Tecnológico
Capa	Tecnología
Frontend	React 18 + Vite, Tailwind CSS, Shadcn/ui
Estado	TanStack Query, React Context
Backend	.NET 8, ASP.NET Core Web API
Base de Datos	MariaDB 11.2, Entity Framework Core
Tiempo Real	SignalR (WebSockets)
Almacenamiento	MinIO (compatible S3) para archivos adjuntos
Caché	Redis
Contenedores	Docker & Docker Compose
CI/CD	GitHub Actions
🚀 Inicio Rápido
Requisitos Previos

    Docker & Docker Compose

    Git

    Node.js 20+ (para desarrollo local)

    .NET 8 SDK (para desarrollo local)

Ejecutar con Docker (Recomendado)
bash

# Clonar el repositorio
git clone https://github.com/tuusuario/flowboard-collab.git
cd flowboard-collab

# Copiar variables de entorno
cp .env.example .env

# Iniciar todos los servicios
docker-compose up -d

# Acceder a la aplicación
# Frontend: http://localhost:3000
# Backend API: http://localhost:5000
# API Docs: http://localhost:5000/swagger
# Consola MinIO: http://localhost:9001

Desarrollo Local

Backend (.NET):
bash

cd backend
dotnet restore
dotnet ef database update
dotnet run

Frontend (React):
bash

cd frontend
npm install
npm run dev

📁 Estructura del Proyecto
text

flowboard-collab/
├── backend/
│   ├── Controllers/          # Endpoints de la API
│   ├── Models/               # Entidades de dominio
│   ├── Data/                 # DbContext y migraciones
│   ├── Services/             # Lógica de negocio
│   ├── Hubs/                 # Hubs de SignalR
│   └── Program.cs            # Punto de entrada
├── frontend/
│   ├── src/
│   │   ├── components/       # Componentes UI reutilizables
│   │   ├── pages/            # Páginas de la aplicación
│   │   ├── hooks/            # Hooks personalizados de React
│   │   ├── services/         # Integración con API
│   │   └── contexts/         # Contextos React (auth, theme)
│   ├── public/
│   └── package.json
├── docker-compose.yml        # Orquestación de contenedores
├── .env.example              # Plantilla de variables de entorno
└── README.md

🐳 Servicios Docker
Servicio	Puerto	Descripción
Frontend	3000	Aplicación React
Backend API	5000	API .NET Core
MariaDB	3306	Base de datos principal
Redis	6379	Caché y respaldo de SignalR
MinIO	9000/9001	Almacenamiento de archivos S3
🤝 Contribuciones

    Haz un Fork del repositorio

    Crea una rama de feature: git checkout -b feature/feature-increible

    Sube tus cambios: git commit -m 'feat: añadir feature increible'

    Push a la rama: git push origin feature/feature-increible

    Abre un Pull Request

Convención de Commits

Usamos Commits Convencionales:

    feat: Nueva funcionalidad

    fix: Corrección de bug

    docs: Documentación

    style: Cambios de estilo de código

    refactor: Refactorización de código

    test: Pruebas

    chore: Tareas de mantenimiento

📊 Documentación de la API

Cuando el backend esté corriendo, visita: http://localhost:5000/swagger
🔒 Variables de Entorno

Copia .env.example a .env y configura:
env

# Base de Datos
DB_ROOT_PASSWORD=root123
DB_NAME=flowboard
DB_USER=flowboard_user
DB_PASSWORD=secure_password

# Backend
ASPNETCORE_ENVIRONMENT=Development
DB_CONNECTION_STRING=Server=mariadb;Database=flowboard;User=root;Password=root123;Port=3306
JWT_SECRET_KEY=tu_clave_super_secreta_min_32_caracteres

# Frontend
VITE_API_URL=http://localhost:5000/api
VITE_SIGNALR_URL=http://localhost:5000/hub

# Almacenamiento MinIO
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin123

📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.