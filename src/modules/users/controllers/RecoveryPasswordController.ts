import { Request, Response } from 'express';
import RecoveryPassword from '../services/RecoveryUserPasswordService';

class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { token, password } = req.body;
    await RecoveryPassword.create({ token, password });
    return res.json({ message: 'password changed successfully' });
  }
}

export default new UserController();
