import jsonwebtoken from 'jsonwebtoken';
import Unauthorized from '../errors/unauthorized.js';
import { JWT_SECRET, NODE_ENV } from '../config.js';

const jwt = jsonwebtoken;

//   res.status(401).send({ message: 'Ошибка авторизации' });

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new Unauthorized('Вы не авторизованы'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new Unauthorized('Вы не авторизованы'));
  }

  req.user = payload;

  return next();
};

export default auth;
