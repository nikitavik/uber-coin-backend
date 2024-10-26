import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AccountsService } from '../../domian/accounts/accounts.service';
import { CreateAccountDto } from '../dto/create-account.dto';
import { DeleteAccountDto } from '../dto/delete-account-dto';
// import { CreateAccountDto } from '../dto/create-account.dto';
// import { UpdateAccountDto } from '../dto/update-account.dto';

@Controller('accounts') // accounts
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get() // GET /accounts /accounts?currency=rub
  findAll() {
    return this.accountsService.findAll();
  }

  @Post('/create')
  create(@Body(ValidationPipe) createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  // @Patch(':id') // PATCH /accounts/:id
  // update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body(ValidationPipe) userUpdate: UpdateAccountDto,
  // ) {
  //   return this.accountsService.update(id, userUpdate);
  // }

  @Delete('/delete') // DELETE /accounts
  delete(@Body(ValidationPipe) deleteAccountDto: DeleteAccountDto) {
    return this.accountsService.delete(deleteAccountDto);
  }
}
