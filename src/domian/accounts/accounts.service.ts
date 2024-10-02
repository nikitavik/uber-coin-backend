import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAccountDto } from '../../application/dto/update-account.dto';
import { CreateAccountDto } from '../../application/dto/create-account.dto';

@Injectable()
export class AccountsService {
  private accounts = [
    {
      id: 1,
      name: '1',
    },
    {
      id: 2,
      name: '2',
    },
  ];

  findAll() {
    return this.accounts;
  }

  findOne(id: number) {
    const user = this.accounts.find((account) => account.id === id);

    if (user === undefined) throw new NotFoundException('User Not Found');

    return user;
  }

  create(createAccountDto: CreateAccountDto) {
    const accountsByHighestId = [...this.accounts].sort((a, b) => b.id - a.id);
    const newAccount = {
      id: accountsByHighestId[0].id + 1,
      ...createAccountDto,
    };
    this.accounts.push(newAccount);
    return newAccount;
  }

  update(id: number, updatedAccountDto: UpdateAccountDto) {
    this.accounts.map((account) => {
      if (account.id == id) {
        return { ...account, ...updatedAccountDto };
      }
      return account;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.accounts = this.accounts.filter((user) => user.id !== id);

    return removedUser;
  }
}
