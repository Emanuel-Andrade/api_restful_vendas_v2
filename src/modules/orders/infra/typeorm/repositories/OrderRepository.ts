import { getRepository, Repository } from 'typeorm';
import { ICreateOrder } from 'src/modules/orders/domain/models/ICreateOrder';
import { IOrdersRepository } from 'src/modules/orders/domain/repositories/IOrderRepository';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}
export default OrdersRepository;
