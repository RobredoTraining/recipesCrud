const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  ingredients: [{ type: String }],
  instructions: { type: String },
  createdAt: { type: Date, default: Date.now }
});

recipeSchema.index({
  title: "text",
  description: "text",
  ingredients: "text"
});

module.exports = mongoose.model("Recipe", recipeSchema);
