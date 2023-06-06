require('dotenv').config();

const { PORT = 3000 } = process.env;
const { DATABASE_URI = 'mongodb://localhost:27017/moviesdb' } = process.env;
const { NODE_ENV = 'development' } = process.env;
const { JWT_SECRET = 'secret' } = process.env;

const baseSubfolderUrl = '/api';

// CORS
const allowedCors = [
  'https://movies-explorer-app.vercel.app/',
  'http://movies-explorer-app.vercel.app/',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
];
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  PORT,
  DATABASE_URI,
  NODE_ENV,
  JWT_SECRET,
  baseSubfolderUrl,
  allowedCors,
  DEFAULT_ALLOWED_METHODS
};
