import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../../application/controllers/user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.entity';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
