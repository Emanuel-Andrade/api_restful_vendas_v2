import { IOrder } from '../IOrderRepository/IOrderRepository';
import { IProduct } from './IOrderNeeds';

export interface IOrdersProducts {
  id: string;

  order: IOrder;

  product: IProduct;

  order_id: string;

  product_id: string;

  price: number;

  quantity: number;

  created_at: Date;

  updated_at: Date;
}
