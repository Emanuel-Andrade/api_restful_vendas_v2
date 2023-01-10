import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProductController from '../controllers/ProductController';

const ProductRouter = Router();

ProductRouter.get('/', ProductController.index);

ProductRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ProductController.show,
);

ProductRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  }),
  ProductController.create,
);

ProductRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  }),
  ProductController.update,
);

ProductRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ProductController.delete,
);

export default ProductRouter;
