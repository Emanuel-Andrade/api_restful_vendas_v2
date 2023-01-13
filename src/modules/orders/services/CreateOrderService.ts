import AppError from 'src/shared/errors/appError';
import { ICustomerRepository } from 'src/modules/customers/domain/repositories/ICustomerRepository';
import { IProduct } from 'src/modules/products/domain/model/IProduct';
import { IProductRepository } from 'src/modules/products/domain/repositories/IProductRepository';
import { IOrder } from '../domain/models/IOrder';
import { IOrderRequest } from '../domain/models/IOrderNeeds';
import { IOrderRepository } from '../domain/IOrderRepository/IOrderRepository';

class CreateOrderService {
  constructor(
    private customerRepository: ICustomerRepository,
    private orderRepository: IOrderRepository,
    private productRepository: IProductRepository,
  ) {}

  public async create({
    id_customer,
    products,
  }: IOrderRequest): Promise<IOrder> {
    const customerExist = await this.customerRepository.findById(id_customer);
    if (!customerExist) throw new AppError('Customer does not exists.');

    const productsExists = await this.productRepository.findAllByIds(products);
    if (!productsExists) throw new AppError('product does not exists.');
    const productsExistsIds = productsExists.map(
      (product: IProduct) => product.id,
    );
    const checkInexistentProducts = products.filter(
      (product) => !productsExistsIds.includes(product.id_product),
    );
    if (checkInexistentProducts.length > 0)
      throw new AppError(
        `could not find product: ${checkInexistentProducts[0].id_product}`,
      );

    const checkUnavailableQuantity = productsExists.filter(
      (product: IProduct) =>
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
      price: productsExists.filter(
        (p: IProduct) => p.id === product.id_product,
      )[0].price,
    }));

    const order = await this.orderRepository.createOrder({
      customer: customerExist,
      products: serializedProducts,
    });

    const { order_products } = order;
    const updateProductsQuantity = order_products.map((order_product) => ({
      id_product: order_product.product_id,
      quantity:
        productsExists.filter(
          (product: IProduct) => product.id === order_product.product_id,
        )[0].quantity - order_product.quantity,
    }));

    await this.productRepository.save(updateProductsQuantity);
    return order;
  }
}
export default CreateOrderService;
