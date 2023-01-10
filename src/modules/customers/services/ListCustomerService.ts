import AppError from 'src/shared/errors/appError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customers';
import CustomerRepository from '../typeorm/repositories/CustomersRepository';

interface IPagination {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

class ListCustomers {
  public async list(): Promise<IPagination> {
    const customCustomerRepository = getCustomRepository(CustomerRepository);
    const users = await customCustomerRepository
      .createQueryBuilder()
      .paginate();
    if (users === undefined) throw new AppError('There is no users');

    return users as IPagination;
  }

  public async findById(id: string): Promise<Customer> {
    const customCustomerRepository = getCustomRepository(CustomerRepository);
    const user = await customCustomerRepository.findById(id);
    if (user === undefined) throw new AppError('There is no user');

    return user;
  }
}
export default new ListCustomers();
