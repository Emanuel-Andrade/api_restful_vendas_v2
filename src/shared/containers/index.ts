import { container } from 'tsyringe';
import { ICustomerRepository } from 'src/modules/customers/domain/repositories/ICustomerRepository';
import CustomersRepository from 'src/modules/customers/infra/typeorm/repositories/CustomersRepository';

container.registerSingleton<ICustomerRepository>(
  'CustomersRepository',
  CustomersRepository,
);
