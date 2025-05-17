import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as dotenv from 'dotenv';
import * as process from 'node:process';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoneyAccountsModule } from '../money-account/money-accounts.module';
import { MoneyAccountOrmEntity } from '../money-account/infrastructure/orm/money-account.orm-entity';
import { UserAccountOrmEntity } from '../user-account/infrastructure/orm/user-account.orm-entity';
import { CurrencyOrmEntity } from '../currency/infrastructure/orm/currency.orm-entity';
import { UserAccountModule } from '../user-account/user-account.module';
import { AuthModule } from '../auth/auth.module';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DATABASE_DIALECT as 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [UserAccountOrmEntity, CurrencyOrmEntity, MoneyAccountOrmEntity],
  synchronize: process.env.NODE_ENV !== 'production',
  autoLoadEntities: process.env.NODE_ENV !== 'production',
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MoneyAccountsModule,
    UserAccountModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
