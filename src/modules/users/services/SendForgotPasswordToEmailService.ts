import { getCustomRepository } from 'typeorm';
import path from 'path';
import AppError from 'src/shared/errors/appError';
import EtherealMail from 'src/config/mail/EtherealMail';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';

class SendForgotPasswordToEmailService {
  public async create(email: string): Promise<void> {
    const customUserRepository = getCustomRepository(UserRepository);
    const customUserTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await customUserRepository.findByEmail(email);
    if (!user) throw new AppError('User does not exists.', 404);

    const templateFile = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    const token = await customUserTokenRepository.generateToken(user.id);
    EtherealMail.send({
      to: {
        name: user.name,
        email,
      },
      subject: '[ API Vendas ] Recuperação de Senha',
      templateData: {
        file: templateFile,
        variables: {
          name: user.name,
          link: `http://localhost:3333/password/recovery/${token}`,
        },
      },
    });
  }
}
export default new SendForgotPasswordToEmailService();
