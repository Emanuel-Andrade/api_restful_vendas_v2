import { getCustomRepository } from 'typeorm';
import AppError from 'src/shared/errors/appError';
import RedisCache from 'src/shared/cache/RedisCache';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

class CreateProduct {
  public async delete(id: string): Promise<Product> {
    const CProductRepository = getCustomRepository(ProductRepository);
    const product = await CProductRepository.findOne(id);

    if (!product) throw new AppError('There is no product with this id');

    await CProductRepository.remove(product);
    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');
    return product;
  }
}
export default new CreateProduct();
