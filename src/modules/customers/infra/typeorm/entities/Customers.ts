import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ICustomer } from 'src/modules/customers/domain/models/ICustomer';

@Entity('customers')
class Customers implements ICustomer {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customers;
