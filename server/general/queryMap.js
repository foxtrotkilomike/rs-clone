// const mongoose = require('mongoose');

const {
  PAGE_NUMBER,
  RECIPES_PER_PAGE,
  ARTICLES_PER_PAGE,
  MIN_HEALTH_SCORE,
  MAX_READY_TIME,
  MIN_SERVING_PRICE,
  MAX_SERVING_PRICE,
  MAX_CALORIES,
  MAX_CARBS,
  MAX_FATS,
  MAX_PROTEINS,
} = require('./constants');

const recipesQueryMap = {
  page: (pageValue) => ['page', Number(pageValue) || PAGE_NUMBER],
  limit: (limitValue) => ['limit', Number(limitValue) || RECIPES_PER_PAGE],
  vegetarian: (passedValue) => ['vegetarian', passedValue === 'true' ? true : false],
  vegan: (passedValue) => ['vegan', passedValue === 'true' ? true : false],
  'gluten-free': (passedValue) => ['glutenFree', passedValue === 'true' ? true : false],
  'dairy-free': (passedValue) => ['dairyFree', passedValue === 'true' ? true : false],
  cheap: (passedValue) => ['cheap', passedValue === 'true' ? true : false],
  'very-popular': (passedValue) => ['veryPopular', passedValue === 'true' ? true : false],
  'min-health-score': (passedValue) => ['healthScore', { $gte: Number(passedValue) || MIN_HEALTH_SCORE }],
  'max-ready': (passedValue) => ['readyInMinutes', { $lte: Number(passedValue) || MAX_READY_TIME }],
  'serving-price': (passedValue) => {
    const [minPrice, maxPrice] = passedValue.split(',');
    return [
      'pricePerServing',
      { $gte: Number(minPrice) || MIN_SERVING_PRICE, $lte: Number(maxPrice) || MAX_SERVING_PRICE },
    ];
  },
  ingredientsAll: (passedValue) => {
    const ingredients = passedValue.split(',');
    return ['extendedIngredients.nameClean', { $all: ingredients }];
  },
  ingredientsExceptOne: (passedValue) => {
    const ingredients = passedValue.split(',');
    const ingredientsLength = ingredients.length;
    // const selectorsArray = createSelectorsArray(ingredients);
    return [
      'extendedIngredients.nameClean',
      {
        $or: [
          {
            $size: ingredientsLength,
            $all: [
              /* all ingredients except one
               */
            ],
          },
        ],
      },
    ];
  },
  cuisines: (passedValue) => {
    const cuisines = passedValue.split(',');
    return ['cuisines', { $in: cuisines }];
  },
  'dish-types': (passedValue) => {
    const dishTypes = passedValue.split(',');
    return ['dishTypes', { $in: dishTypes }];
  },
  diets: (passedValue) => {
    const diets = passedValue.split(',');
    return ['diets', { $in: diets }];
  },
  'max-calories': (passedValue) => [
    'nutrition.nutrients',
    { $elemMatch: { name: 'Calories', amount: { $lte: Number(passedValue) || MAX_CALORIES } } },
  ],
  'max-carbs': (passedValue) => [
    'nutrition.nutrients',
    { $elemMatch: { name: 'Carbohydrates', amount: { $lte: Number(passedValue) || MAX_CARBS } } },
  ],
  'max-fats': (passedValue) => [
    'nutrition.nutrients',
    { $elemMatch: { name: 'Fat', amount: { $lte: Number(passedValue) || MAX_FATS } } },
  ],
  'max-proteins': (passedValue) => [
    'nutrition.nutrients',
    { $elemMatch: { name: 'Protein', amount: { $lte: Number(passedValue) || MAX_PROTEINS } } },
  ],
  search: (passedValue) => {
    const searchOptions = passedValue.split(',').join('|');
    return ['title', { $regex: searchOptions, $options: 'i' }];
  },
  id: (passedValue) => {
    const ids = passedValue.split(',');
    return ['id', { $in: ids }];
  },
};

const recipesSortMap = {
  popularity: 'veryPopular',
  date: 'createdAt',
  rating: 'aggregateLikes',
  price: 'pricePerServing',
};

const articlesQueryMap = {
  page: (pageValue) => ['page', Number(pageValue) || PAGE_NUMBER],
  limit: (limitValue) => ['limit', Number(limitValue) || ARTICLES_PER_PAGE],
  category: (passedValue) => ['category', { $in: passedValue }],
  search: (passedValue) => {
    const searchOptions = passedValue.split(',').join('|');
    return ['title', { $regex: searchOptions, $options: 'i' }];
  },
  id: (passedValue) => {
    const ids = passedValue.split(',');
    return ['_id', { $in: ids }];
  },
};

module.exports = { recipesQueryMap, recipesSortMap, articlesQueryMap };
