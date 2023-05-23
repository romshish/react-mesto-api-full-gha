import express from 'express';
import Celebrate from 'celebrate';
import auth from '../middlewares/auth.js';
import usersRoutes from './users.js';
import cardsRoutes from './cards.js';
import { createUser, login } from '../controllers/users.js';
import NotFoundError from '../errors/not-found-err.js';

const routes = express.Router();
const { celebrate, Joi } = Celebrate;

routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), login);

routes.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({ scheme: ['http', 'https'] }),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), createUser);

routes.use('/users', auth, usersRoutes);
routes.use('/cards', auth, cardsRoutes);

routes.use((req, res, next) => {
  next(new NotFoundError('Страница по указанному пути не найдена'));
});

export default routes;
