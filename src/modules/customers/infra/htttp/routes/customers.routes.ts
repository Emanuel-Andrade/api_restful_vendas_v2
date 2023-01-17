import { Router } from 'express';
import { Segments, Joi, celebrate } from 'celebrate';
import CustomerController from '../controllers/CustomersController';
import IsAuthenticated from '../../../middlewares/IsAuthenticated';

const routes = Router();
const customerController = new CustomerController();

routes.get('/', IsAuthenticated.execute, customerController.index);
routes.get('/:id', IsAuthenticated.execute, customerController.show);
routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customerController.create,
);

routes.put(
  '/',
  IsAuthenticated.execute,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3),
      email: Joi.string().email(),
      customer_id: Joi.string().uuid().required(),
    },
  }),
  customerController.update,
);

routes.delete('/:id', IsAuthenticated.execute, customerController.delete);

export default routes;
