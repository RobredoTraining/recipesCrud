    const express = require("express");
    const router = express.Router();
    const recipeController = require("../controllers/recipe.controller");
    const { validateRecipe } = require("../validators/recipe.validator");
    
    router.post("/", validateRecipe, recipeController.createRecipe);
    router.get("/", recipeController.getRecipes);
    router.get("/:id", recipeController.getRecipeById);
    router.put("/:id", recipeController.updateRecipe);
    router.delete("/:id", recipeController.deleteRecipe);
    router.get("/search", recipeController.searchRecipes);
    
    module.exports = router;
    