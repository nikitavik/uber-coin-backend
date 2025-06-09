import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoneyAccountOrmEntity } from './infrastructure/orm/money-account.orm-entity';
import { MoneyAccountRepositoryImpl } from './infrastructure/repositories/money-account.repository.impl';

import { MoneyAccountsService } from './application/services/money-accounts.service';

import { MoneyAccountsController } from './money-accounts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MoneyAccountOrmEntity])],
  controllers: [MoneyAccountsController],
  providers: [MoneyAccountsService, MoneyAccountRepositoryImpl],
})
export class MoneyAccountsModule {}
