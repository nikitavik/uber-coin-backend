import { MoneyAccountEntity } from '../../domain/entities/money-account.entity';

export class AccountResponseDto {
  id: string;
  name: string;
  amount: number;
  colorHex: string;

  constructor(moneyAccount: MoneyAccountEntity) {
    this.id = moneyAccount.id;
    this.name = moneyAccount.name;
    this.amount = moneyAccount.amount;
    this.colorHex = moneyAccount.colorHex;
  }
}
