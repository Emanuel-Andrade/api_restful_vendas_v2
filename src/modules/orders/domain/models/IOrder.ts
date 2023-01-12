import { ICustomer } from 'src/modules/customers/domain/models/ICustomer';
import { IOrdersProducts } from './IOrderProducts';

export interface IOrder {
  id: string;

  customer: ICustomer;

  order_products: IOrdersProducts[];

  created_at: Date;

  updated_at: Date;
}
