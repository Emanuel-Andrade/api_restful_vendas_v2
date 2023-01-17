import { IProduct } from 'src/modules/products/domain/models/IProduct';

interface IProductAndQuantity {
  id_product: string;
  quantity: number;
}

export interface IProductRepository {
  findByName(name: string): Promise<IProduct | undefined>;

  findAllByIds(
    products: IProductAndQuantity[],
  ): Promise<IProduct[] | undefined>;

  findOne(name: string): Promise<IProduct | undefined>;

  find(conditions?: string[] | undefined): Promise<IProduct[] | undefined>;

  save(ProductAndQuantity: IProductAndQuantity[]): void;
}
