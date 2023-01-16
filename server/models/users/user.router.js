const router = require('express').Router();
const { signup, signin, logout } = require('../../middlewares/auth.controller');
const verifyToken = require('../../middlewares/authJWT');
const { StatusCodes } = require('http-status-codes');
const errorMessages = require('../../errors/errorMessages.config');
const userService = require('./user.service');

router.post('/register', signup, () => {});

router.post('/login', signin, () => {});

router.get('/logout', logout, () => {});

router.get('/profile', verifyToken, async (req, res, next) => {
  if (!req.userId) {
    res.status(StatusCodes.FORBIDDEN).send(errorMessages.user.forbidden);
  } else {
    userService
      .getUserById(req.userId)
      .then((user) =>
        res.status(StatusCodes.OK).send({
          id: user._id,
          email: user.email,
          name: user.name,
          articles: user.articles,
          recipes: user.recipes,
          products: user.products,
        })
      )
      .catch((error) => next(error));
  }
});

router.post('/update', verifyToken, (req, res, next) => {
  if (!req.userId) {
    res.status(StatusCodes.FORBIDDEN).send(errorMessages.user.forbidden);
  } else {
    userService
      .updateUser(req.userId, req.body.articles, req.body.recipes, req.body.products)
      .then((modifiedCount) => {
        if (modifiedCount === 1) {
          res.status(StatusCodes.OK).send();
        } else {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
      })
      .catch((error) => next(error));
  }
});

module.exports = router;
