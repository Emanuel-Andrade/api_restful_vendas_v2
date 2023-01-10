import { getCustomRepository } from 'typeorm';
import AppError from 'src/shared/errors/appError';
import RedisCache from 'src/shared/cache/RedisCache';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}
class CreateProduct {
  public async create({ name, price, quantity }: IRequest): Promise<IRequest> {
    const CProductRepository = getCustomRepository(ProductRepository);
    const hasProduct = await CProductRepository.findByName(name);

    if (hasProduct)
      throw new AppError('There is already an product with this name');
    const product = CProductRepository.create({ name, price, quantity });
    CProductRepository.save(product);

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    return product;
  }
}
export default new CreateProduct();
