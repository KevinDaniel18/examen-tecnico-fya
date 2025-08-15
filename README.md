# Examen FYA - Aplicación Fullstack

Aplicación Fullstack para gestión de usuarios y créditos, con frontend en **Next.js**, backend en **NestJS**, base de datos en **Supabase (PostgreSQL)** y despliegue con **Docker**, **Render** y **Vercel**.

---

## Prueba rápida

https://examen-tecnico-fya.vercel.app/

---

## 📁 Estructura del proyecto

```
examen-fya/
├─ frontend/                 # Frontend Next.js
│  ├─ app/                   # App Router de Next.js
│  │  ├─ auth/
│  │  │  └─ login/
│  │  │     └─ page.tsx
│  │  ├─ credits/
│  │  │  ├─ page.tsx
│  │  │  └─ register-credit/
│  │  │     └─ page.tsx
│  │  ├─ layout.tsx
│  │  └─ page.tsx
│  ├─ components/            # Componentes reutilizables
│  │  ├─ ui/                 # Componentes UI (shadcn/ui)
│  │  ├─ auth/
│  │  │  ├─ LoginUser.tsx
│  │  │  └─ RegisterUser.tsx
│  │  ├─ Credits.tsx
│  │  ├─ CreateCredit.tsx
│  │  └─ NavBar.tsx
│  ├─ context/
│  │  └─ AuthContext.tsx     # Context de autenticación
│  ├─ services/
│  │  └─ api.ts              # Cliente HTTP
│  └─ types/                 # Tipos TypeScript
├─ backend/                  # Backend NestJS
│  ├─ src/
│  │  ├─ auth/               # Módulo de autenticación
│  │  ├─ credits/            # Módulo de créditos
│  │  ├─ users/              # Módulo de usuarios
│  │  ├─ common/             # Utilidades compartidas
│  │  ├─ prisma/             # Configuración Prisma
│  │  │  └─ schema.prisma
│  │  └─ main.ts
│  ├─ Dockerfile
│  └─ package.json
└─ docker-compose.yml        # Orquestación de contenedores
```

---

## ⚙️ Tecnologías

### Frontend

- **Next.js 14** - Framework de React con App Router
- **React 18** - Librería para interfaces de usuario
- **TypeScript** - Superset tipado de JavaScript
- **Tailwind CSS** - Framework de CSS utility-first
- **shadcn/ui** - Componentes UI pre-diseñados
- **Lucide Icons** - Iconos SVG optimizados
- **Axios** - Cliente HTTP para API calls

### Backend

- **NestJS** - Framework de Node.js escalable
- **Node.js** - Runtime de JavaScript
- **TypeScript** - Lenguaje principal del backend
- **Prisma ORM** - ORM moderno para bases de datos
- **JWT** - Autenticación basada en tokens
- **Nodemailer** - Envío de correos electrónicos
- **bcrypt** - Hash de contraseñas

### Base de datos

- **Supabase** - Backend-as-a-Service con PostgreSQL
- **PostgreSQL** - Base de datos relacional

### DevOps & Deployment

- **Docker** - Contenedorización
- **Docker Compose** - Orquestación local
- **Vercel** - Despliegue del frontend
- **Render** - Despliegue del backend

---

## 🛠 Configuración del proyecto

### 1. Prerrequisitos

- Node.js (v18 o superior)
- Docker y Docker Compose
- Git

### 2. Clonación del repositorio

```bash
git clone https://github.com/KevinDaniel18/examen-tecnico-fya.git
cd examen-tecnico-fya
```

### 3. Variables de entorno

#### Backend (.env en /backend)

```env
# Base de datos Supabase
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/postgres?sslmode=require"

# JWT
JWT_SECRET="tu_jwt_secret_super_seguro_aqui"
JWT_EXPIRES_IN="7d"

# Correo electrónico
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="tu-correo@gmail.com"
SMTP_PASS="tu-app-password-de-gmail"

# Semilla de usuario
SEED_USER_PASSWORD="super_secret_seed_password"

# Configuración de aplicación
NODE_ENV="development"
PORT=4000
```

#### Frontend (.env.local en /frontend)

```env
# URL del backend
NEXT_PUBLIC_API_URL="http://localhost:4000"

# Para producción
# NEXT_PUBLIC_API_URL="https://tu-backend.render.com"
```

### 4. Instalación y configuración

#### Opción A: Con Docker (Recomendado)

```bash
# Levantar todos los servicios
docker-compose up --build

# En modo background
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

#### Opción B: Desarrollo local

```bash
# Backend
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev

# En otra terminal - Frontend
cd frontend
npm install
npm run dev
```

### 5. Acceso a la aplicación

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:4000
- **Documentación API:** http://localhost:4000/api (Swagger)

---

## 🗄️ Base de datos

### Esquema Prisma

```prisma
model User {
  id       Int      @id @default(autoincrement())
  name     String
  email    String   @unique
  password String
  credits  Credit[]
}

model Credit {
  id          Int      @id @default(autoincrement())
  clientName  String
  creditValue Float
  salesRepId  Int
  salesRep    User     @relation(fields: [salesRepId], references: [id])
  createdAt   DateTime @default(now())
}
```

### Migración inicial

```bash
cd backend
npx prisma migrate dev --name init
npx prisma generate
```

---

## 🔐 Autenticación

La aplicación utiliza **JWT (JSON Web Tokens)** para la autenticación:

1. **Registro/Login**: El usuario se autentica y recibe un token
2. **Almacenamiento**: El token se guarda en el Context de React
3. **Protección**: Las rutas privadas validan el token
4. **Expiración**: Los tokens expiran según `JWT_EXPIRES_IN`

### Rutas protegidas

- `/credits` - Lista de créditos
- `/credits/register-credit` - Registro de nuevos créditos

---

## 📧 Sistema de notificaciones

Cuando se registra un nuevo crédito, se envía un email automático con:

- ✅ Template HTML estilizado
- 📱 Diseño responsive
- 📊 Detalles del crédito formateados
- 🎨 Branding corporativo de FYA

---

## 🚀 Funcionalidades

### ✨ Características principales

- **🔐 Autenticación completa** (Login/Register/Logout)
- **👥 Gestión de usuarios** con perfiles
- **💳 CRUD de créditos** con validaciones
- **📧 Notificaciones por email** automáticas
- **📱 Diseño responsive** adaptado a móviles
- **🎨 UI moderna** con Tailwind CSS y shadcn/ui
- **🔒 Rutas protegidas** con redirecciones automáticas
- **⚡ Performance optimizada** con Next.js App Router

### 🎯 Flujo de usuario

1. **Landing page** para usuarios no autenticados
2. **Login/Register** con validaciones
3. **Dashboard de créditos** con listado
4. **Formulario de registro** de nuevos créditos
5. **Navegación intuitiva** con navbar responsive

---

## 🐳 Docker

### Servicios configurados

```yaml
version: "3.9"

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - backend
    env_file:
      - .env
    networks:
      - app-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "4000:4000"
    env_file:
      - .env
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

### Comandos útiles

```bash
# Rebuilding específico
docker-compose up --build backend
docker-compose up --build frontend

# Logs de un servicio
docker-compose logs backend
docker-compose logs frontend

# Ejecutar comandos en contenedor
docker-compose exec backend npm run prisma:generate
docker-compose exec backend npm run prisma:migrate

# Limpiar todo
docker-compose down -v
docker system prune -a
```

---

## 🚀 Despliegue

### Frontend (Vercel)

1. Conectar repositorio con Vercel
2. Configurar variables de entorno:
   ```
   NEXT_PUBLIC_API_URL=https://tu-backend.render.com
   ```
3. Deploy automático en cada push

### Backend (Render)

1. Crear Web Service en Render
2. Configurar variables de entorno:
   ```
   DATABASE_URL=tu_supabase_url
   JWT_SECRET=tu_jwt_secret
   SMTP_USER=tu_correo
   SMTP_PASS=tu_password
   NODE_ENV=production
   ```
3. Build command: `npm install && npx prisma generate`
4. Start command: `npm run start:prod`

---

## 🧪 Testing

### Comandos de testing

```bash
# Backend
cd backend
npm run test          # Unit tests
npm run test:e2e      # End-to-end tests
npm run test:cov      # Coverage report

# Frontend
cd frontend
npm run test          # Jest tests
npm run test:watch    # Watch mode
```

---

## 📝 API Endpoints

### Autenticación

- `POST /auth/login` - Iniciar sesión
- `POST /auth/register` - Registrar usuario

### Usuarios

- `GET /users` - Listar usuarios (protegido)
- `GET /users/:id` - Usuario específico

### Créditos

- `GET /credits` - Listar créditos del usuario
- `POST /credits` - Crear nuevo crédito
- `PUT /credits/:id` - Actualizar crédito
- `DELETE /credits/:id` - Eliminar crédito

### Documentación completa

Accede a `http://localhost:4000/api` para ver la documentación interactiva de Swagger.

---

## 👨‍💻 Desarrollado por

**Kevin Sierra** - Examen Técnico FYA Social Capital

- 📧 Email: kevnsc18@gmail.com

---

## 🙏 Agradecimientos

- **FYA Social Capital** por la oportunidad
- **Vercel** y **Render** por las plataformas de despliegue
- **Supabase** por la infraestructura de base de datos
- Comunidad de **Next.js** y **NestJS**
