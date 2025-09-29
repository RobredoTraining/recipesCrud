// middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
    console.error(err.stack); // Log técnico en servidor
  
    // Definir un statusCode (si no viene, 500)
    const statusCode = err.statusCode || 500;
  
    // Respuesta uniforme en JSON
    res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
      // Solo mostrar detalles en desarrollo, no en producción
      ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
  }
  
  module.exports = errorHandler;

  