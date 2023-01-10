import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/appError';
import Customer from '../typeorm/entities/Customers';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class ShowCustomerProfile {
  public async findById(user_id: string): Promise<Customer> {
    const customCustomerRepository = getCustomRepository(CustomersRepository);
    const customer = await customCustomerRepository.findById(user_id);
    if (customer === undefined) throw new AppError('There is no user');

    return customer;
  }
}
export default new ShowCustomerProfile();
