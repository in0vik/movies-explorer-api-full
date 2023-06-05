const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const { statusCodes } = require('../config/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const auth = (req, res, next) => {
  // const { jwt: authorization } = req.cookies;
  const { authorization: token } = req.headers;
  const authorization = token.split(' ')[1];
  if (!authorization) {
    throw new UnauthorizedError(statusCodes.unauthorized.message.login);
  }
  let payload;
  try {
    payload = jwt.verify(authorization, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError(statusCodes.unauthorized.message.token));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
