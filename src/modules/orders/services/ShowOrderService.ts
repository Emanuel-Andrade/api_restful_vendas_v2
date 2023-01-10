import { getCustomRepository } from 'typeorm';
import AppError from 'src/shared/errors/appError';
import Order from '../typeorm/entities/Order';
import OrderRepository from '../typeorm/repositories/OrderRepository';

interface IRequest {
  id: string;
}
class ShowOrderService {
  public async show({ id }: IRequest): Promise<Order> {
    const customOrderRepository = getCustomRepository(OrderRepository);

    const order = await customOrderRepository.findById(id);

    if (!order) throw new AppError('Order not found.', 404);
    return order;
  }
}
export default new ShowOrderService();
