import { Request, Response } from 'express';
import SendForgotPasswordToEmailService from '../services/SendForgotPasswordToEmailService';

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    await SendForgotPasswordToEmailService.create(req.body.email);
    return res.json({ message: 'Token sent to email' });
  }
}

export default new UserController();
