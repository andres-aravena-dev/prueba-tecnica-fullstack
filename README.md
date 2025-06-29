
Este repositorio contiene una aplicación Fullstack para gestión de tareas,
el cual permite operaciones CRUD, para crear  una nueva tarea con opciones de
nombre, descripcion, fecha vencimiento, estado  y etiquetas.

desarrollada con las siguientes herramientas:

- Front End: React + Vite + TailwindCSS  
- Back End: NestJS + Sequelize  
- BASE DE DATOS: PostgreSQL  
- EJECUCION  DESPLIEGUE: Docker y Docker Compose  

---------------------------------------------------------------------------------------------------------------------

## Estructura del Proyecto

prueba-tecnica-fullstack/
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── .env
├── frontend/
│   ├── package.json
│   └── vite.config.ts
├── imagenes de prueba/
├── docker-compose.yml
└── README.md

la carpeta "imagenes de prueba" contiene un pdf 
con imagenes de todas las interfaces en caso de ser necesarios.

---------------------------------------------------------------------------------------------------------------------
##  Instrucciones de Instalacion

 Requisitos Previos

- Docker y Docker Compose instalados
- Git

---

## Levantar el Proyecto con Docker Compose

Desde la raíz del repositorio, ejecutar:

bash
docker-compose up --build


Esto ejecutará:

- Front End: http://localhost:5173  
- Back End: http://localhost:3000  
- Base de datos: puerto 5432

El cual se puede ver desde la interfaz de docker donde se  podra gestionar, Back,Front  y DB

---

##  Variables de Entorno (Backend)

Crear un archivo ".env" en la carpeta "backend/" con el siguiente contenido:

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=tododb
DB_HOST=db
DB_PORT=5432
DB_NAME=tododb
DB_USERNAME=postgres
DB_PASSWORD=postgres



---------------------------------------------------------------------------------------------------------------------

##  Notas Tecnicas

- Se habilitó CORS en "main.ts" del backend para permitir solicitudes desde el frontend:


app.enableCors({
  origin: 'http://localhost:5173',
});



---------------------------------------------------------------------------------------------------------------------
## En caso de necesitar hacer pruebas separadas front o back

#Frontend


cd frontend
npm install
npm run dev   # Servidor local en http://localhost:5173


#Backend


cd backend
npm install
npm run start:dev  # Servidor local en http://localhost:3000


---------------------------------------------------------------------------------------------------------------------




