import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { AccountsService } from '../../domian/accounts/accounts.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';

@Controller('accounts') // accounts
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get() // GET /accounts /accounts?currency=rub
  findAll(@Query('role') role?: string) {
    return this.accountsService.findAll();
  }

  @Get(':id') // GET /accounts/:id or
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.findOne(id);
  }

  @Post()
  create(@Body(ValidationPipe) account: CreateAccountDto) {
    return this.accountsService.create(account);
  }

  @Patch(':id') // PATCH /accounts/:id
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) userUpdate: UpdateAccountDto,
  ) {
    return this.accountsService.update(id, userUpdate);
  }

  @Delete(':id') // DELETE /accounts
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.delete(id);
  }
}
