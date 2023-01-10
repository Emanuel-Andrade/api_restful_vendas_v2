import { getCustomRepository } from 'typeorm';
import RedisCache from 'src/shared/cache/RedisCache';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

class ListProducts {
  public async list(): Promise<Product[]> {
    const CProductRepository = getCustomRepository(ProductRepository);

    let products = await RedisCache.recover<Product[]>(
      'api-vendas-PRODUCT_LIST',
    );

    if (!products) {
      products = await CProductRepository.find();
      RedisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}
export default new ListProducts();
