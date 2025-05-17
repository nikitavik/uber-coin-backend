import { MoneyAccountOrmEntity } from '../../../money-account/infrastructure/orm/money-account.orm-entity';

export class UserAccountEntity {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public name: string,
    public createdAt: string,
    public accounts: MoneyAccountOrmEntity[],
  ) {}
}
