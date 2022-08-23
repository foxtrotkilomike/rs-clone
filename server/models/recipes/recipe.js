const mongoose = require('mongoose');

const { Schema } = mongoose;

const RecipeSchema = new Schema({
  name: String,
  imageUrl: String,
  category: [String],
  area: [String],
  instructions: String,
  products: [String],
  calories: Number,
});

const Recipe = mongoose.model('Recipes', RecipeSchema);

module.exports = Recipe;
