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

// Obtener todas las recetas con paginación
exports.getRecipes = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, parseInt(limit)); // max 50 por página
    const skip = (pageNum - 1) * limitNum;

    const [recipes, total] = await Promise.all([
      Recipe.find().skip(skip).limit(limitNum),
      Recipe.countDocuments()
    ]);

    res.json({
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      results: recipes
    });
  } catch (err) {
    next(err);
  }
};

// Buscar recetas por texto completo con paginación
exports.searchRecipes = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: "Missing search query 'q'" });
    }
    
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(50, parseInt(limit)); // max 50 por página
    const skip = (pageNum - 1) * limitNum;
    
    const [recipes, total] = await Promise.all([
      Recipe.find(
        { $text: { $search: q } },
        { score: { $meta: "textScore" } }
      )
        .sort({ score: { $meta: "textScore" } })
        .skip(skip)
        .limit(limitNum),

      Recipe.countDocuments({ $text: { $search: q } })
    ]);

    res.json({
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      results: recipes
    });
  } catch (err) {
    next(err);
  }
};
