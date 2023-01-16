import { inject, injectable } from 'tsyringe';
import { ICustomer } from 'src/modules/customers/domain/models/ICustomer';
import { ICustomersRepository } from 'src/modules/customers/domain/repositories/ICustomerRepository';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(): Promise<ICustomer[] | undefined> {
    const customers = await this.customersRepository.findAll();

    return customers;
  }
}

export default ListCustomerService;
