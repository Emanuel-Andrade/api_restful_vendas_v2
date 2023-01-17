import { inject, injectable } from 'tsyringe';
import AppError from 'src/shared/errors/appError';
import { IProductsRepository } from '../domain/repositories/IProductRepository';
import { IShowProduct } from '../domain/models/IShowProducts';
import { IProduct } from '../domain/models/IProduct';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IShowProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }
    return product;
  }
}
export default ShowProductService;
