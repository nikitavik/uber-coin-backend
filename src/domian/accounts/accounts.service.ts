import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { FastifyRequest } from 'fastify';
import { Repository } from 'typeorm';

import { Accounts } from './entities/accounts.entity';
import { CreateAccountDto } from '../../application/dto/create-account.dto';
import { DeleteAccountDto } from '../../application/dto/delete-account-dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private accountsRepository: Repository<Accounts>,
    @Inject(REQUEST)
    private readonly request: FastifyRequest,
  ) {}

  findAll() {
    if (this.request.user.sub) {
      return this.accountsRepository.find({
        where: { user: { id: this.request.user.sub } },
      });
    } else {
      throw new UnauthorizedException();
    }
  }

  create(createAccountDto: CreateAccountDto) {
    const newAccount = this.accountsRepository.create({
      ...createAccountDto,
      user: { id: this.request.user.sub },
    });

    return this.accountsRepository.save(newAccount);
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

  async delete(deleteAccountDto: DeleteAccountDto) {
    const { id } = deleteAccountDto;

    const accountToDelete = await this.accountsRepository.findOne({
      where: { id },
    });

    if (!accountToDelete) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }

    await this.accountsRepository.remove(accountToDelete);

    return accountToDelete;
  }
}
