import { inject, injectable } from 'tsyringe';
import AppError from 'src/shared/errors/appError';
import Customer from 'src/modules/customers/infra/typeorm/entities/Customers';
import { ICustomersRepository } from 'src/modules/customers/domain/repositories/ICustomerRepository';
import { IShowCustomer } from '../domain/models/IShowCustomer';

@injectable()
class ShowCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }
    return customer;
  }
}
export default ShowCustomerService;
