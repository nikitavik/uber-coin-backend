import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Currency } from '../currency/currency.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  email: string;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'timestamptz',
  })
  created_at: string;

  @ManyToOne(() => Currency, (currency) => currency.id)
  currency_id: number;
}
