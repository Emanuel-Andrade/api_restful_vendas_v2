import { Response, Request } from 'express';
import CreateProductServices from '../services/CreateProductServices';
import DeleteProductServices from '../services/DeleteProductServices';
import ListProductServices from '../services/ListProductServices';
import ShowProductServices from '../services/ShowProductServices';
import UpdateProductServices from '../services/UpdateProductServices';

class ProductController {
  public async index(req: Request, res: Response): Promise<Response> {
    const product = await ListProductServices.list();

    return res.json(product);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const product = await ShowProductServices.show(id);

    return res.json(product);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const product = await CreateProductServices.create(data);

    return res.json(product);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const product = await UpdateProductServices.update(data);

    return res.json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await DeleteProductServices.delete(id);
    const products = await ListProductServices.list();

    return res.json(products);
  }
}

export default new ProductController();
