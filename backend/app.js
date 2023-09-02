const express = require('express');

const mongoose = require('mongoose');
const cors = require('cors');

const { errors } = require('celebrate');
const router = require('./routes/router');
const auth = require('./middlewares/auth');

const errorHandler = require('./middlewares/errorHandler');
const defaultErrorNotFound = require('./middlewares/defaultErrorNotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.use(cors({ origin: true, credentials: true }));
app.use('/', router);
app.use(errorLogger);
app.use(errors());

app.use('*', auth, defaultErrorNotFound);

app.use(errorHandler);

app.listen(PORT);
