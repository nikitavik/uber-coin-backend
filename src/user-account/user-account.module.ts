import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './application/services/user.service';
import { UserAccountOrmEntity } from './infrastructure/orm/user-account.orm-entity';
import { UserAccountRepositoryImpl } from './infrastructure/repositories/user-account.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccountOrmEntity])],
  controllers: [UserController],
  providers: [UserService, UserAccountRepositoryImpl],
  exports: [UserService],
})
export class UserAccountModule {}
