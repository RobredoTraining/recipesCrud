const Recipe = require("../models/recipe");
const createError = require("http-errors");

// Crear receta
exports.createRecipe = async (req, res, next) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    next(createError(400, err.message)); // pasa al middleware de errores
  }
};

// Obtener todas
exports.getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    next(createError(500, err.message));
  }
};

// Obtener una por ID
exports.getRecipeById = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) throw createError(404, "Recipe not found");
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

// Actualizar
exports.updateRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!recipe) throw createError(404, "Recipe not found");
    res.json(recipe);
  } catch (err) {
    next(err);
  }
};

// Eliminar
exports.deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) throw createError(404, "Recipe not found");
    res.json({ message: "Recipe deleted" });
  } catch (err) {
    next(err);
  }
};
