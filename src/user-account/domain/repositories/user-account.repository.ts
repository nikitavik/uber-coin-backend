import { UserAccountEntity } from '../entities/user-account.entity';

export interface IUserAccountRepository {
  findOneByEmail(email: string): Promise<UserAccountEntity>;
  create(account: UserAccountEntity): Promise<UserAccountEntity>;
  update(account: UserAccountEntity): Promise<UserAccountEntity>;
  delete(id: string): Promise<void>;
}
