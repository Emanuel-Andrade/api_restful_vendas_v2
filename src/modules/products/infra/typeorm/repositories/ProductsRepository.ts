import { FindConditions, In, Repository } from 'typeorm';
import { IProductRepository } from 'src/modules/products/domain/repositories/IProductRepository';
import { IProduct } from 'src/modules/products/domain/model/IProduct';

interface IFindProducts {
  id_product: string;
  quantity: number;
}

class ProductRepository implements IProductRepository {
  constructor(private ormRepository: Repository<IProduct>) {}

  async findOne(name: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne(name);
    return product;
  }

  find(conditions: any): Promise<IProduct[]> {
    const products = this.ormRepository.find(conditions);
    return products;
  }

  public async findByName(name: string): Promise<IProduct | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<IProduct[]> {
    const ids = products.map((product) => product.id_product);

    const findProducts = await this.ormRepository.find({
      where: {
        id: In(ids),
      },
    });
    return findProducts;
  }
}

export default ProductRepository;
