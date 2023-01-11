import AppError from 'src/shared/errors/appError';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';
import { ICustomer } from '../domain/models/ICustomer';

class CreateCustomer {
  constructor(private customerRepository: ICustomerRepository) {}

  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExist = await this.customerRepository.findByEmail(email);
    if (emailExist) throw new AppError('Email address already registered');

    const customer = await this.customerRepository.create({
      name,
      email,
    });

    return customer;
  }
}
export default CreateCustomer;
