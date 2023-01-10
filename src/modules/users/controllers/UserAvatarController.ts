import { Request, Response } from 'express';
import AppError from 'src/shared/errors/appError';
import UploadUserAvatarService from '../services/UploadUserAvatarService';

class UserController {
  public async execute(req: Request, res: Response): Promise<Response> {
    if (!req.file) throw new AppError('image not sent', 400);
    const { filename } = req.file;
    const user = await UploadUserAvatarService.execute({
      userId: req.user.id,
      avatarFileName: filename,
    });
    return res.json(user);
  }
}

export default new UserController();
