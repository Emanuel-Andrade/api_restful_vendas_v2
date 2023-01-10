import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AppError from 'src/shared/errors/appError';
import AuthConfig from 'src/config/auth';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  name: string;
  email: string;
  id: string;
  token: string;
}

class CreateUserSession {
  public async login({ password, email }: IRequest): Promise<IResponse> {
    const customUserRepository = getCustomRepository(UserRepository);

    const user = await customUserRepository.findByEmail(email);
    if (!user) throw new AppError('Email or Password incorrect', 401);

    const isPassword = await compare(password, user.password);
    if (!isPassword) throw new AppError('Email or Password incorrect', 401);

    const token = sign({}, AuthConfig.jwt.secret, {
      subject: user.id,
      expiresIn: AuthConfig.jwt.ExpiresIn,
    });
    return {
      name: user.name,
      email: user.email,
      id: user.id,
      token,
    };
  }
}
export default new CreateUserSession();
