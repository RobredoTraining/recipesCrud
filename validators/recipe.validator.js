const Joi = require("joi");

// Schema de validación
const recipeSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  ingredients: Joi.array().items(Joi.string().min(2)).min(1).required(),
  instructions: Joi.string().min(10).required(),
  cookingTime: Joi.number().min(1).required(),
  servings: Joi.number().min(1).required()
});

// Middleware para validar
function validateRecipe(req, res, next) {
  const { error } = recipeSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((err) => err.message)
    });
  }
  next();
}

module.exports = { validateRecipe };
