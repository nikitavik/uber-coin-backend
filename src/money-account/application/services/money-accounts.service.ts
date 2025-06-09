import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

import { MoneyAccountEntity } from '../../domain/entities/money-account.entity';
import { MoneyAccountRepositoryImpl } from '../../infrastructure/repositories/money-account.repository.impl';

import { CreateMoneyAccountDto } from '../dto/create-money-account.dto';
import { DeleteMoneyAccountDto } from '../dto/delete-money-account.dto';
import { AccountResponseDto } from '../dto/account-response.dto';

@Injectable()
export class MoneyAccountsService {
  constructor(
    private readonly accountsRepository: MoneyAccountRepositoryImpl,
  ) {}

  async findAll() {
    return await this.accountsRepository.findAll();
  }

  async create(createAccountDto: CreateMoneyAccountDto, userId: string) {
    const account = new MoneyAccountEntity(
      uuid(),
      createAccountDto.name,
      createAccountDto.amount,
      createAccountDto.colorHex,
      userId,
    );

    const created = await this.accountsRepository.create(account);
    return new AccountResponseDto(created);
  }

  // update(id: number, updatedAccountDto: UpdateAccountDto) {
  //   this.accounts.map((account) => {
  //     if (account.id == id) {
  //       return { ...account, ...updatedAccountDto };
  //     }
  //     return account;
  //   });
  //
  //   return this.findOne(id);
  // }

  async delete(deleteAccountDto: DeleteMoneyAccountDto) {
    await this.accountsRepository.delete(deleteAccountDto.id);
  }
}
