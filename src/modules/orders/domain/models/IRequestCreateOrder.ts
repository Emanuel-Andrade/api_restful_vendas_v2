import { IProduct } from 'src/modules/products/domain/models/IProduct';

export interface IRequestCreateOrder {
  customer_id: string;
  products: IProduct[];
}
