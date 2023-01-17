import { container } from 'tsyringe';

import { ICustomersRepository } from 'src/modules/customers/domain/repositories/ICustomerRepository';
import CustomersRepository from 'src/modules/customers/infra/typeorm/repositories/CustomersRepository';
import OrdersRepository from 'src/modules/orders/infra/typeorm/repositories/OrderRepository';
import { IOrdersRepository } from 'src/modules/orders/domain/repositories/IOrderRepository';
import { IProductsRepository } from 'src/modules/products/domain/repositories/IProductRepository';
import ProductsRepository from 'src/modules/products/infra/typeorm/repositories/ProductsRepository';
import { IUsersRepository } from 'src/modules/users/domain/repositories/IUsersRepository';
import UsersRepository from 'src/modules/users/infra/typeorm/repositories/UserRepository';
import UserTokensRepository from 'src/modules/users/infra/typeorm/repositories/UserTokenRepository';
import { IUserTokensRepository } from 'src/modules/users/domain/repositories/IUserTokensRepository';

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
