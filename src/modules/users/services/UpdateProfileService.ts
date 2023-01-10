import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import AppError from '../../../shared/errors/appError';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IUpdateVariables {
  [key: string]: string;
}

interface IRequest {
  user_id: string;
  variables: IUpdateVariables;
}

class UpdateUser {
  public async update({ user_id, variables }: IRequest): Promise<User> {
    const customUserRepository = getCustomRepository(UserRepository);
    const user = await customUserRepository.findById(user_id);
    if (user === undefined) throw new AppError('There is no user');

    if (
      variables.password &&
      !(await bcrypt.compare(variables.old_password, user.password))
    ) {
      throw new AppError('old password does not match');
    }

    if (variables.email) {
      const emailExist = await customUserRepository.findByEmail(
        variables.email,
      );

      if (emailExist) throw new AppError('Email already registered');
    }
    if (variables.email) user.email = variables.email;
    if (variables.name) user.name = variables.name;
    if (variables.password) {
      user.password = await bcrypt.hash(variables.password, 8);
    }
    await customUserRepository.save(user);
    return user;
  }
}
export default new UpdateUser();
