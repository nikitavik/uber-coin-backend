import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Currency } from '../currency/currency.entity';

@Entity({ name: 'user_account' })
export class UserAccount {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column('varchar', {
    length: 320 /* According to email standards (RFC 5321 and RFC 5322),
                   the maximum length of an email address is 320 characters */,
    unique: true,
  })
  email: string;

  @Column('varchar')
  password: string;

  @Column('varchar', {
    length: 200,
  })
  name: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  created_at: string;

  @ManyToOne(() => Currency, (currency) => currency.id)
  currency_id: number;
}
