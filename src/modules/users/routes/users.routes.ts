import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import multer from 'multer';
import uploadConfig from 'src/config/upload';
import UserController from '../controllers/UserController';
import IsAuthenticated from '../middlewares/IsAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/', IsAuthenticated.execute, UserController.index);
routes.get('/:id', IsAuthenticated.execute, UserController.findById);
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
    },
  }),
  UserController.create,
);

routes.patch(
  '/',
  IsAuthenticated.execute,
  upload.single('avatar'),
  UserAvatarController.execute,
);

export default routes;
