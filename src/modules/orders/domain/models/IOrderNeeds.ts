import { ICustomer } from 'src/modules/customers/domain/models/ICustomer';

export interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

export interface IRequest {
  customer: ICustomer;
  products: IProduct[];
}

interface IProducts {
  id_product: string;
  quantity: number;
}

export interface IOrderRequest {
  id_customer: string;
  products: IProducts[];
}
