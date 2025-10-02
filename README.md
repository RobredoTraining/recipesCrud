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

```json
## 📌 API Endpoints

🔹 Crear receta  

POST `/api/recipes`  
{
  "title": "Pasta Carbonara",
  "ingredients": ["pasta", "egg", "cheese", "bacon"],
  "instructions": "Boil pasta, mix with egg and cheese, add bacon."
}

Response 201

{
  "_id": "651234abcd5678ef9012",
  "title": "Pasta Carbonara",
  "ingredients": ["pasta", "egg", "cheese", "bacon"],
  "instructions": "Boil pasta, mix with egg and cheese, add bacon.",
  "createdAt": "2025-09-30T10:15:00.000Z"
}

🔹 Obtener todas las recetas (con paginación)

GET /api/recipes?page=1&limit=10

Response 200 OK

{
  "total": 42,
  "page": 1,
  "totalPages": 5,
  "results": [
    {
      "_id": "651234abcd5678ef9012",
      "title": "Pasta Carbonara",
      "ingredients": ["pasta", "egg", "cheese", "bacon"],
      "instructions": "Boil pasta, mix with egg and cheese, add bacon."
    }
  ]
}

🔹 Obtener receta por ID

GET /api/recipes/:id

{
  "_id": "651234abcd5678ef9012",
  "title": "Pasta Carbonara",
  "ingredients": ["pasta", "egg", "cheese", "bacon"],
  "instructions": "Boil pasta, mix with egg and cheese, add bacon."
}

🔹 Actualizar receta

PUT /api/recipes/:id

{
  "title": "Pasta Carbonara (updated)",
  "ingredients": ["pasta", "egg", "cheese", "bacon", "pepper"],
  "instructions": "Boil pasta, mix with egg, cheese and pepper, add bacon."
}

📤 Response 200 OK

{
  "_id": "651234abcd5678ef9012",
  "title": "Pasta Carbonara (updated)",
  "ingredients": ["pasta", "egg", "cheese", "bacon", "pepper"],
  "instructions": "Boil pasta, mix with egg, cheese and pepper, add bacon."
}

🔹 Eliminar receta

DELETE /api/recipes/:id

📤 Response 200 OK

{
  "message": "Recipe deleted"
}

🔹 Buscar recetas (texto completo con paginación)

GET /api/recipes/search?q=pasta&page=1&limit=5

📤 Response 200 OK

{
  "total": 12,
  "page": 1,
  "totalPages": 3,
  "results": [
    {
      "_id": "651234abcd5678ef9012",
      "title": "Pasta Carbonara",
      "ingredients": ["pasta", "egg", "cheese", "bacon"],
      "instructions": "Boil pasta, mix with egg and cheese, add bacon."
    }
  ]
}

