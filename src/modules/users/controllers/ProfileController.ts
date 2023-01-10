import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const result = await ShowProfileService.findById(id);
    return res.json(instanceToInstance(result));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = {
      user_id: req.user.id,
      variables: req.body,
    };
    const result = await UpdateProfileService.update(data);
    return res.json(instanceToInstance(result));
  }
}

export default new ProfileController();
