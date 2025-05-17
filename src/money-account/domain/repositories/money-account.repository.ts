import { MoneyAccountEntity } from '../entities/money-account.entity';

export interface IMoneyAccountRepository {
  create(account: MoneyAccountEntity): Promise<MoneyAccountEntity>;
  update(account: MoneyAccountEntity): Promise<MoneyAccountEntity>;
  delete(id: string): Promise<void>;
  findAllByUserId(userId: string): Promise<MoneyAccountEntity[]>;
  findAll(): Promise<MoneyAccountEntity[]>;
}
