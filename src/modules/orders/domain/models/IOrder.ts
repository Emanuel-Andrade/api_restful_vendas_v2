import { ICustomer } from 'src/modules/customers/domain/models/ICustomer';
import { ICreateOrderProducts } from './ICreateOrderProduct';

export interface IOrder {
  id: string;
  customer: ICustomer;
  order_products: ICreateOrderProducts[];
  created_at: Date;
  updated_at: Date;
}
