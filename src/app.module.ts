import * as dotenv from 'dotenv';

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './domian/accounts/accounts.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './domian/user/user.module';
import { User } from './domian/user/user.entity';
import { Dialect } from 'sequelize';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DATABASE_DIALECT as Dialect,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      models: [User],
      // retryAttempts,
      // retryDelay,
      // autoLoadModels,
      // keepConnectionAlive,
      // synchronize,
    }),
    AccountsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
