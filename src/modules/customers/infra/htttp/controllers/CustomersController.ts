import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from 'src/modules/customers/services/CreateCustomerService';
import DeleteCustomerService from 'src/modules/customers/services/DeleteCustomerProfile';
import ListCustomerService from 'src/modules/customers/services/ListCustomerService';
import ShowCustomerService from 'src/modules/customers/services/ShowCustomerProfile';
import UpdateCustomerService from 'src/modules/customers/services/UpdateCustomersService';

export default class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = container.resolve(ListCustomerService);

    const customers = await listCustomers.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomer = container.resolve(ShowCustomerService);

    const customer = await showCustomer.execute({ id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const createCustomer = container.resolve(CreateCustomerService);
    const customer = await createCustomer.create({
      name,
      email,
    });
    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });
    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });

    return response.json([]);
  }
}
