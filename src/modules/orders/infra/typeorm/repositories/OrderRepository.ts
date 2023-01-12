import { getRepository, Repository } from 'typeorm';
import { IRequest } from 'src/modules/orders/domain/models/IOrderNeeds';
import { IOrderRepository } from 'src/modules/orders/domain/IOrderRepository/IOrderRepository';
import { IOrder } from 'src/modules/orders/domain/models/IOrder';
import Order from '../entities/Order';

class OrdersRepository implements IOrderRepository {
  private ormRepository: Repository<IOrder>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  async findById(id: string): Promise<IOrder | undefined> {
    const order = await this.ormRepository.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  async createOrder({ customer, products }: IRequest): Promise<IOrder> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }

  async save(order: IOrder): Promise<IOrder> {
    const newOrder = this.ormRepository.create(order);

    await this.ormRepository.save(newOrder);

    return newOrder;
  }

  async create(order: IOrder): Promise<IOrder> {
    await this.ormRepository.save(order);

    return order;
  }
}

export default OrdersRepository;
