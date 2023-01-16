const User = require('./user.model');
const { StatusCodes } = require('http-status-codes');
const errorMessages = require('../../errors/errorMessages.config');
const QueryError = require('../../errors/errorEmitter');

async function getUserById(userId) {
  const user = await User.findOne({ _id: userId });
  if (!user || user.length === 0) {
    throw new QueryError(StatusCodes.NOT_FOUND, errorMessages.user.notFound(userId));
  }

  return user;
}

async function updateUser(userId, articlesObject, recipesObject, productsObject) {
  const res = await User.updateOne(
    { _id: userId },
    { articles: articlesObject, recipes: recipesObject, products: productsObject }
  );

  return res.modifiedCount;
}

module.exports = { getUserById, updateUser };
