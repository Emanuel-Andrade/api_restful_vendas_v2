import { IOrder } from '../models/IOrder';
import { IRequest } from '../models/IOrderNeeds';

export interface IOrderRepository {
  findById(id: string): Promise<IOrder | undefined>;

  createOrder({ customer, products }: IRequest): Promise<IOrder>;

  createOrder({ customer, products }: IRequest): Promise<IOrder>;

  save(order: IOrder): Promise<IOrder>;

  create(order: IOrder): Promise<IOrder>;
}
