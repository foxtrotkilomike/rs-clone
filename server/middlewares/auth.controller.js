const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');

const User = require('../models/users/user.model');
const errorMessages = require('../errors/errorMessages.config');
const successMessages = require('../general/successMessages');

const { SALT_ROUNDS, JWT_SECRET, JWT_EXPIRES_IN } = require('../general/constants');

function signup(req, res) {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, SALT_ROUNDS),
  });

  user
    .save()
    .then(() => res.status(StatusCodes.CREATED).send(successMessages.auth.register))
    .catch(() => res.status(StatusCodes.BAD_REQUEST).send(errorMessages.user.userExists));
}

function signin(req, res) {
  User.findOne({
    email: req.body.email,
  }).exec((error, user) => {
    if (error) res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessages.general.internal);
    if (!user) res.status(StatusCodes.NOTFOUND).send(errorMessages.general.notFound);

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      res.status(StatusCodes.UNAUTHORIZED).send({ accessToken: null, message: errorMessages.user.invalidPassword });

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET,
      {
        expiresIn: Number(JWT_EXPIRES_IN),
      }
    );

    res.status(StatusCodes.OK).send({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      message: successMessages.auth.login,
      accessToken: token,
    });
  });
}

module.exports = { signup, signin };
