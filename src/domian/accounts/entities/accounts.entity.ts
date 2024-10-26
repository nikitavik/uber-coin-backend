import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserAccount } from '../../user/entities/user.entity';

@Entity()
export class Accounts {
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

  @ManyToOne(() => UserAccount, (user) => user.accounts, { nullable: false })
  user: UserAccount;
}
