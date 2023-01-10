import { getCustomRepository } from 'typeorm';
import AppError from 'src/shared/errors/appError';
import RedisCache from 'src/shared/cache/RedisCache';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  name: string;
  id: string;
  price: number;
  quantity: number;
}

class CreateProduct {
  public async update({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const CProductRepository = getCustomRepository(ProductRepository);
    const product = await CProductRepository.findOne(id);

    if (!product) throw new AppError('There is no product with this id');

    const hasProduct = await CProductRepository.findByName(name);

    if (hasProduct && name !== product.name)
      throw new AppError('There is already an product with this name');

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await CProductRepository.save(product);
    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');
    return product;
  }
}
export default new CreateProduct();
