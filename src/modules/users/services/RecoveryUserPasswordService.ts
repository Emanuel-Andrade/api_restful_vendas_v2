import { getCustomRepository } from 'typeorm';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';
import AppError from 'src/shared/errors/appError';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';

interface IRequest {
  token: string;
  password: string;
}
class SendForgotPasswordToEmailService {
  public async create({ token, password }: IRequest): Promise<void> {
    const customUserRepository = getCustomRepository(UserRepository);
    const customUserTokenRepository = getCustomRepository(UserTokenRepository);

    const tokenExists = await customUserTokenRepository.findByToken(token);
    if (!tokenExists) throw new AppError('User Token does not exists.', 404);
    const user = await customUserRepository.findById(tokenExists.user_id);
    if (!user) throw new AppError('User does not exists.', 404);

    const compareDate = addHours(tokenExists.created_at, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired', 401);
    }
    user.password = await hash(password, 8);
    await customUserRepository.save(user);
  }
}
export default new SendForgotPasswordToEmailService();
