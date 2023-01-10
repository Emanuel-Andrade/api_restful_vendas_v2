import { getCustomRepository } from 'typeorm';
import AppError from 'src/shared/errors/appError';
import { hash } from 'bcryptjs';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
class CreateUser {
  public async create({ name, password, email }: IRequest): Promise<IRequest> {
    const customUserRepository = getCustomRepository(UserRepository);

    const emailExist = await customUserRepository.findByEmail(email);
    if (emailExist) throw new AppError('Email address already registered');

    const hashedPassword = await hash(password, 8);
    const product = customUserRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    customUserRepository.save(product);

    return product;
  }
}
export default new CreateUser();
