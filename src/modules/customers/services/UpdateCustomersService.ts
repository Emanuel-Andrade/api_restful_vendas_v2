import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/appError';
import Customer from '../typeorm/entities/Customers';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IUpdateVariables {
  [key: string]: string;
}

interface IRequest {
  customer_id: string;
  variables: IUpdateVariables;
}

class UpdateCustomer {
  public async update({ customer_id, variables }: IRequest): Promise<Customer> {
    const customCustomerRepository = getCustomRepository(CustomerRepository);
    const customer = await customCustomerRepository.findById(customer_id);
    if (customer === undefined) throw new AppError('There is no customer');

    if (variables.email) {
      const emailExist = await customCustomerRepository.findByEmail(
        variables.email,
      );

      if (emailExist) throw new AppError('Email already registered');
    }
    if (variables.email) customer.email = variables.email;
    if (variables.name) customer.name = variables.name;
    await customCustomerRepository.save(customer);
    return customer;
  }
}
export default new UpdateCustomer();
