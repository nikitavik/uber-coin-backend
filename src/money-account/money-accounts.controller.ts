import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  ValidationPipe,
} from '@nestjs/common';

import { MoneyAccountsService } from './application/services/money-accounts.service';

import { CreateMoneyAccountDto } from './application/dto/create-money-account.dto';
import { DeleteMoneyAccountDto } from './application/dto/delete-money-account.dto';
import { FastifyRequest } from 'fastify';

@Controller('accounts') // accounts
export class MoneyAccountsController {
  constructor(private readonly accountsService: MoneyAccountsService) {}

  @Get() // GET /accounts /accounts
  findAll() {
    return this.accountsService.findAll();
  }

  @Post('/create')
  create(
    @Body(ValidationPipe) createAccountDto: CreateMoneyAccountDto,
    @Req() request: FastifyRequest,
  ) {
    return this.accountsService.create(createAccountDto, request.user.sub);
  }

  // @Patch(':id') // PATCH /accounts/:id
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body(ValidationPipe) userUpdate: UpdateAccountDto,
  // ) {
  //   return this.accountsService.update(id, userUpdate);
  // }

  @Delete('/delete') // DELETE /accounts
  delete(@Body(ValidationPipe) deleteAccountDto: DeleteMoneyAccountDto) {
    return this.accountsService.delete(deleteAccountDto);
  }
}
