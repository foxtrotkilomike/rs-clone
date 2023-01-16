const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const recipesRouter = require('./models/recipes/recipe.router');
const articlesRouter = require('./models/articles/article.router');
const userRouter = require('./models/users/user.router');

const { StatusCodes } = require('http-status-codes');
const errorHandler = require('./errors/errorHandler');
const errorMessages = require('./errors/errorMessages.config');

const app = express();

process.on('unhandledRejection', (error) => {
  console.log('unhandledRejection', error.message);
});

const corsOptions = {
  origin: true,
  allowedHeaders: ['Content-Type'],
  credentials: true,
  exposedHeaders: ['set-cookie'],
};

app.use(logger('tiny'));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/recipes', recipesRouter);
app.use('/articles', articlesRouter);
app.use('/user', userRouter);

app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send(errorMessages.general.notFound);
});

app.use(errorHandler);

module.exports = app;
