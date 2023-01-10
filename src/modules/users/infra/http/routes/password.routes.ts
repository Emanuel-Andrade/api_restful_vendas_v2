import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import CreateTokenPassword from '../controllers/CreatePasswordTokenController';
import RecoveryPassword from '../controllers/RecoveryPasswordController';

const routes = Router();

routes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  CreateTokenPassword.create,
);

routes.post(
  '/recovery',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required().min(6),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  RecoveryPassword.create,
);

export default routes;
