import { Module } from '@nestjs/common';
import { AccountsController } from '../../application/controllers/accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from './entities/accounts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Accounts])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
