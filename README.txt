# Recipes CRUD API

Una API RESTful para gestionar recetas de cocina, desarrollada con Node.js, Express y MongoDB (local o Atlas).  

---

## 🔹 Características

- Crear, leer, actualizar y eliminar recetas (CRUD completo).  
- Validaciones de datos con **Joi**.  
- Seguridad básica: **Helmet**, **CORS**, **Rate Limiting**.  
- Middleware global de manejo de errores y rutas no encontradas (404).  
- Configuración separada por entornos (`development` y `production`).  
- Compatible con MongoDB local o MongoDB Atlas.

---

## 🔹 Estructura del proyecto

├─ config/ # Configuración por entorno
│ ├─ default.json
│ ├─ development.json
│ └─ production.json
├─ controllers/ # Lógica de los endpoints
├─ middleware/ # Middlewares globales (errores, 404, validación)
├─ models/ # Modelos de Mongoose
├─ routes/ # Definición de rutas
├─ validators/ # Validaciones de datos (Joi)
├─ server.js # Inicialización del servidor
├─ app.js # Configuración de Express
├─ package.json
└─ .env # Variables de entorno

# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
