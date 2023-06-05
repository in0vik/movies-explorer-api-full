const { PORT = 3000 } = process.env;
const { DATABASE_URL = 'mongodb://localhost:27017/moviesdb' } = process.env;
const { NODE_ENV = 'development' } = process.env;
const { JWT_SECRET = 'secret' } = process.env;

module.exports = {
  PORT,
  DATABASE_URL,
  NODE_ENV,
  JWT_SECRET,
};
