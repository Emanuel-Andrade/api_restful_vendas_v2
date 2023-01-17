import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import IsAuthenticated from 'src/modules/customers/middlewares/IsAuthenticated';
import OrdersController from '../controllers/OrdersController';

const OrderRoutes = Router();
const ordersController = new OrdersController();
OrderRoutes.use(IsAuthenticated.execute);

OrderRoutes.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

OrderRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      id_customer: Joi.string().required().uuid(),
      products: Joi.required(),
    },
  }),
  ordersController.create,
);

export default OrderRoutes;
