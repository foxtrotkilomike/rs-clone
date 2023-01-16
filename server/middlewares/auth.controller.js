const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/users/user.model');
const errorMessages = require('../errors/errorMessages.config');
const successMessages = require('../general/successMessages');

const { SALT_ROUNDS, JWT_SECRET, JWT_EXPIRES_IN, MS_IN_SECOND } = require('../general/constants');

const cookieOptions = {
  sameSite: 'none',
  maxAge: Number(JWT_EXPIRES_IN * MS_IN_SECOND),
  secure: true,
};

function signup(req, res) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, SALT_ROUNDS),
  });

  user
    .save()
    .then((user) => {
      const token = generateToken(user._id, JWT_SECRET, JWT_EXPIRES_IN);
      res.cookie('token', token, cookieOptions);
      res.status(StatusCodes.CREATED).send({ name: req.body.name });
    })
    .catch(() => res.status(StatusCodes.BAD_REQUEST).send(errorMessages.user.userExists));
}

function signin(req, res) {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessages.general.internal);
      return;
    }
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).send(errorMessages.general.notFound);
      return;
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      res.status(StatusCodes.UNAUTHORIZED).send({ accessToken: null, message: errorMessages.user.invalidPassword });
    } else {
      const token = generateToken(user._id, JWT_SECRET, JWT_EXPIRES_IN);
      res.cookie('token', token, cookieOptions);

      res.status(StatusCodes.OK).send({
        id: user._id,
        email: user.email,
        name: user.name,
        articles: user.articles,
        recipes: user.recipes,
        products: user.products,
      });
    }
  });
}

function logout(req, res) {
  res.clearCookie('token');
  res.status(StatusCodes.NO_CONTENT).send(successMessages.auth.logout);
}

function generateToken(userId, secretKey, expirationTime) {
  return jwt.sign(
    {
      id: userId,
    },
    secretKey,
    {
      expiresIn: Number(expirationTime),
    }
  );
}

module.exports = { signup, signin, logout };
