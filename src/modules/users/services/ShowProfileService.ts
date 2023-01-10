import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/appError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

class ShowProfileService {
  public async findById(user_id: string): Promise<User> {
    const customUserRepository = getCustomRepository(UserRepository);
    const user = await customUserRepository.findById(user_id);
    if (user === undefined) throw new AppError('There is no user');

    return user;
  }
}
export default new ShowProfileService();
