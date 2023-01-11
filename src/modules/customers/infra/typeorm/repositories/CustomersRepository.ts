import { ICreateCustomer } from 'src/modules/customers/domain/models/ICreateCustomer';
import { ICustomerRepository } from 'src/modules/customers/domain/repositories/ICustomerRepository';
import { getRepository, Repository } from 'typeorm';
import Customer from '../entities/Customers';

class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = this.ormRepository.create({ name, email });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    await this.ormRepository.save(customer);

    return customer;
  }

  public async findByName(name: string): Promise<Customer[] | undefined> {
    const result = await this.ormRepository.find({
      where: {
        name,
      },
    });
    return result;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const result = await this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return result;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const result = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return result;
  }
}

export default CustomersRepository;
