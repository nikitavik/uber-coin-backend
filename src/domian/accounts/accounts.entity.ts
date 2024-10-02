import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Currency } from '../currency/currency.entity';
import { UserAccount } from '../user/user.entity';

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', { length: 250 })
  name: string;

  @Column('varchar')
  color_hex: string;

  @ManyToOne(() => Currency, (currency) => currency.id)
  currency_id: number;

  @Column('money')
  amount: number;

  @OneToMany(() => UserAccount, (user) => user.id)
  user_id: number;
}
