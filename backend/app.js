require('dotenv').config();
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors: celebrateErrors } = require('celebrate');
const { mongoose } = require('mongoose');
const { PORT, DATABASE_URI } = require('./config/config');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rateLimiter');

app.use(requestLogger);
app.use(limiter);
app.use(helmet());

try {
  mongoose.connect(DATABASE_URI);
  console.log(`connected to mongodb: ${DATABASE_URI}`);
} catch (error) {
  console.log(`error connecting to mongodb: ${error}`);
}
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors);
app.use(routes);
app.use(errorLogger);
app.use(celebrateErrors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`App is listening port: ${PORT}`);
});
