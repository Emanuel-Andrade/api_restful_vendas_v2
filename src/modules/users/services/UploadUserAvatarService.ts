import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from 'src/shared/errors/appError';
import authConfig from 'src/config/upload';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

interface Iresponse {
  id: string;
  avatar: string;
  name: string;
}

class UploadUserAvatarService {
  public async execute({
    userId,
    avatarFileName,
  }: IRequest): Promise<Iresponse> {
    const customUserRepository = getCustomRepository(UserRepository);

    const user = await customUserRepository.findById(userId);
    if (!user) throw new AppError('User not found', 401);

    if (user) {
      const userAvatarFilePath = path.join(authConfig.directory, user.avatar);
      const avatarExist = await fs.promises.stat(userAvatarFilePath);
      if (avatarExist) fs.promises.unlink(userAvatarFilePath);
    }
    user.avatar = avatarFileName;
    const newUser = await customUserRepository.save(user);
    return { id: newUser.id, avatar: newUser.avatar, name: newUser.name };
  }
}
export default new UploadUserAvatarService();
