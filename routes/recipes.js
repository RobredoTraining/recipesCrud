const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipe.controller");
const { recipeValidationRules, idValidationRule, validate } = require("../middleware/validators");

router.post("/", recipeValidationRules, validate, recipeController.createRecipe);
router.get("/", recipeController.getRecipes);
router.get("/:id", idValidationRule, validate, recipeController.getRecipeById);
router.put("/:id", idValidationRule, recipeValidationRules, validate, recipeController.updateRecipe);
router.delete("/:id", idValidationRule, validate, recipeController.deleteRecipe);
router.get("/search", recipeController.searchRecipes);

module.exports = router;
