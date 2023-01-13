import { IOrdersProducts } from 'src/modules/orders/domain/models/IOrderProducts';

export interface IProduct {
  id: string;

  order_products: IOrdersProducts[];

  name: string;

  price: number;

  quantity: number;

  created_at: Date;

  updated_at: Date;
}
