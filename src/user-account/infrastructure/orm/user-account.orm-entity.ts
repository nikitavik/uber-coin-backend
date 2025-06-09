import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MoneyAccountOrmEntity } from '../../../money-account/infrastructure/orm/money-account.orm-entity';

@Entity({ name: 'user_account' })
export class UserAccountOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  createdAt: string;

  // TODO: Add currencies
  // @OneToMany(() => Currency, (currency) => currency.id)
  // currency: number;

  @OneToMany(() => MoneyAccountOrmEntity, (account) => account.user, {
    nullable: false,
  })
  accounts: MoneyAccountOrmEntity[];
}
