export interface IProduct {
  id: string;

  order_products: OrdersProducts[];

  name: string;

  price: number;

  quantity: number;

  created_at: Date;

  updated_at: Date;
}
