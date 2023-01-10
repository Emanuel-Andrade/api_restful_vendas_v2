import { getCustomRepository } from 'typeorm';
import AppError from 'src/shared/errors/appError';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}
class CreateCustomer {
  public async create({ name, email }: IRequest): Promise<IRequest> {
    const customCustomerRepository = getCustomRepository(CustomerRepository);

    const emailExist = await customCustomerRepository.findByEmail(email);
    if (emailExist) throw new AppError('Email address already registered');

    const customer = customCustomerRepository.create({
      name,
      email,
    });
    customCustomerRepository.save(customer);

    return customer;
  }
}
export default new CreateCustomer();
