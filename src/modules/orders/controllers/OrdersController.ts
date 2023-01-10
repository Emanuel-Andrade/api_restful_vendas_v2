import { Response, Request } from 'express';
import ShoOrderService from '../services/ShowOrderService';
import CreateOrderService from '../services/CreateOrderService';

class ProductController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const product = await ShoOrderService.show({ id });

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const product = await CreateOrderService.create(data);

    return res.json(product);
  }
}

export default new ProductController();
