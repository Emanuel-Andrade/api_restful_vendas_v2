import { Request, Response } from 'express';
import UpdateCustomerService from '../../../services/UpdateCustomersService';
import CreateCustomersService from '../../../services/CreateCustomerService';
import ListCustomersService from '../../../services/ListCustomerService';
import DeleteCustomersService from '../../../services/DeleteCustomerProfile';
import ShowCustomerProfile from '../../../services/ShowCustomerProfile';
import CustomersRepository from '../../typeorm/repositories/CustomersRepository';

class CustomerController {
  public async index(req: Request, res: Response): Promise<Response> {
    const result = await ListCustomersService.list();
    return res.json(result);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const customerRepository = new CustomersRepository();
    const CreateCustomer = new CreateCustomersService(customerRepository);
    const data = req.body;
    const result = await CreateCustomer.create(data);
    return res.json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { customer_id } = req.body;
    const variables = req.body;
    const result = await UpdateCustomerService.update({
      customer_id,
      variables,
    });
    return res.json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await DeleteCustomersService.delete(id);
    return res.json(result);
  }

  public async findOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const result = await ShowCustomerProfile.findById(id);
    return res.json(result);
  }
}

export default new CustomerController();
