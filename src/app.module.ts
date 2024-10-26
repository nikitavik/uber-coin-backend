import * as dotenv from 'dotenv';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './domian/accounts/accounts.module';
import { UserModule } from './domian/user/user.module';
import { UserAccount } from './domian/user/entities/user.entity';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as process from 'node:process';
import { Currency } from './domian/currency/entities/currency.entity';
import { Accounts } from './domian/accounts/entities/accounts.entity';
import { AuthModule } from './domian/auth/auth.module';

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DATABASE_DIALECT as 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [UserAccount, Currency, Accounts],
  synchronize: process.env.NODE_ENV !== 'production',
  autoLoadEntities: process.env.NODE_ENV !== 'production',
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AccountsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
