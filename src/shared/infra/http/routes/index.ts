import { Router } from 'express';
import ProductRouter from 'src/modules/products/infra/http/routes/product.routes';
import UserRoutes from 'src/modules/users/infra/http/routes/users.routes';
import LoginRoutes from 'src/modules/users/infra/http/routes/login.routes';
import passwordRoutes from 'src/modules/users/infra/http/routes/password.routes';
import ProfileRoutes from 'src/modules/users/infra/http/routes/profile.routes';
import CustomerRoutes from 'src/modules/customers/infra/htttp/routes/customers.routes';
import OrderRoutes from 'src/modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/products', ProductRouter);
routes.use('/users', UserRoutes);
routes.use('/login', LoginRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', ProfileRoutes);
routes.use('/customers', CustomerRoutes);
routes.use('/orders', OrderRoutes);

export default routes;
