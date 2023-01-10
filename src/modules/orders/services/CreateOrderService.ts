import { getCustomRepository } from 'typeorm';
import AppError from 'src/shared/errors/appError';
import CustomerRepository from 'src/modules/customers/typeorm/repositories/CustomersRepository';
import ProductRepository from 'src/modules/products/typeorm/repositories/ProductsRepository';
import Order from '../typeorm/entities/Order';
import OrderRepository from '../typeorm/repositories/OrderRepository';

interface IProducts {
  id_product: string;
  quantity: number;
}

interface IRequest {
  id_customer: string;
  products: IProducts[];
}
class CreateOrderService {
  public async create({ id_customer, products }: IRequest): Promise<Order> {
    const customOrderRepository = getCustomRepository(OrderRepository);
    const customCustomerRepository = getCustomRepository(CustomerRepository);
    const customProductRepository = getCustomRepository(ProductRepository);

    const customerExist = await customCustomerRepository.findById(id_customer);
    if (!customerExist) throw new AppError('Customer does not exists.');

    const productsExists = await customProductRepository.findAllByIds(products);
    if (!productsExists) throw new AppError('product does not exists.');
    const productsExistsIds = productsExists.map((product) => product.id);
    const checkInexistentProducts = products.filter(
      (product) => !productsExistsIds.includes(product.id_product),
    );
    if (checkInexistentProducts.length > 0)
      throw new AppError(
        `could not find product: ${checkInexistentProducts[0].id_product}`,
      );

    const checkUnavailableQuantity = productsExists.filter(
      (product) =>
        products.filter((p) => p.id_product === product.id)[0].quantity >
        product.quantity,
    );

    if (checkUnavailableQuantity.length > 0)
      throw new AppError(
        `Ordered quantity for the product: "${checkUnavailableQuantity[0].name}" is greater than the in-stock quantity`,
      );

    const serializedProducts = products.map((product) => ({
      product_id: product.id_product,
      quantity: product.quantity,
      price: productsExists.filter((p) => p.id === product.id_product)[0].price,
    }));

    const order = await customOrderRepository.createOrder({
      customer: customerExist,
      products: serializedProducts,
    });

    const { order_products } = order;
    const updateProductsQuantity = order_products.map((order_product) => ({
      id: order_product.product_id,
      quantity:
        productsExists.filter(
          (product) => product.id === order_product.product_id,
        )[0].quantity - order_product.quantity,
    }));

    await customProductRepository.save(updateProductsQuantity);
    return order;
  }
}
export default new CreateOrderService();
