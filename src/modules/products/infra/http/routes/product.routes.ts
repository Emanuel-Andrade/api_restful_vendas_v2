import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProductController from '../controllers/ProductsController';

const ProductRouter = Router();
const productController = new ProductController();
ProductRouter.get('/', productController.index);

ProductRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.show,
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
  productController.create,
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
  productController.update,
);

ProductRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productController.delete,
);

export default ProductRouter;
