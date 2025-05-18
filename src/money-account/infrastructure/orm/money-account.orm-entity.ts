import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserAccountOrmEntity } from '../../../user-account/infrastructure/orm/user-account.orm-entity';

@Entity({ name: 'money_account' })
export class MoneyAccountOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 250 })
  name: string;

  @Column('varchar')
  colorHex: string;

  // @ManyToOne(() => Currency, (currency) => currency.id)
  // currency: number;

  @Column('money')
  amount: number;

  @ManyToOne(() => UserAccountOrmEntity, (user) => user.accounts, {
    nullable: false,
  })
  @JoinColumn({ name: 'userId' })
  user: UserAccountOrmEntity;

  @Column('uuid')
  userId: string;
}
