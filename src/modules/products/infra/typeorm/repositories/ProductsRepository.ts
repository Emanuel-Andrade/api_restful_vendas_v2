import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
  id_product: string;
  quantity: number;
}

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const ids = products.map((product) => product.id_product);

    const findProducts = await this.find({
      where: {
        id: In(ids),
      },
    });
    return findProducts;
  }
}

export default ProductRepository;
