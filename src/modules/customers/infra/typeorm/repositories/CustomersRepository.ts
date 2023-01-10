import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customers';

@EntityRepository(Customer)
class CustomersRepository extends Repository<Customer> {
  public async findByName(name: string): Promise<Customer[] | undefined> {
    const result = await this.find({
      where: {
        name,
      },
    });
    return result;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const result = await this.findOne({
      where: {
        email,
      },
    });
    return result;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const result = await this.findOne({
      where: {
        id,
      },
    });
    return result;
  }
}

export default CustomersRepository;
