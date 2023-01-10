import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import IsAuthenticated from '../middlewares/IsAuthenticated';
import ProfileController from '../controllers/ProfileController';

const routes = Router();
routes.use(IsAuthenticated.execute);

routes.get('/', ProfileController.show);
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(6).optional(),
      old_password: Joi.string().when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
      confirmation_password: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  ProfileController.update,
);

export default routes;
