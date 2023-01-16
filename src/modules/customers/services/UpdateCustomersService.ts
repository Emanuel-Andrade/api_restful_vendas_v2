import { inject, injectable } from 'tsyringe';
import AppError from 'src/shared/errors/appError';
import Customer from 'src/modules/customers/infra/typeorm/entities/Customers';
import { ICustomersRepository } from 'src/modules/customers/domain/repositories/ICustomerRepository';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';

@injectable()
class UpdateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.');
    }
    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}
export default UpdateCustomerService;
