const { body, param, query, validationResult } = require("express-validator");

// Validaciones para crear/actualizar receta
const recipeValidationRules = [
  body("title").notEmpty().withMessage("Title is required"),
  body("ingredients").isArray().withMessage("Ingredients must be an array"),
  body("instructions").notEmpty().withMessage("Instructions are required")
];

// Validación para ID (ej. en params)
const idValidationRule = [
  param("id").isMongoId().withMessage("Invalid recipe ID")
];

// Middleware para manejar errores de validación
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  recipeValidationRules,
  idValidationRule,
  validate
};
