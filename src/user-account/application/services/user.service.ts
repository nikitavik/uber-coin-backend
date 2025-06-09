import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { UserAccountRepositoryImpl } from '../../infrastructure/repositories/user-account.repository.impl';
import { UserAccountEntity } from '../../domain/entities/user-account.entity';
import { RegisterUserDto } from '../../../auth/application/dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(private userAccountRepo: UserAccountRepositoryImpl) {}

  async findOneByEmail(email: string) {
    return this.userAccountRepo.findOneByEmail(email);
  }

  async createUser(createUserDto: RegisterUserDto): Promise<UserAccountEntity> {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const userAccount = new UserAccountEntity(
      uuid(),
      createUserDto.email,
      hashedPassword,
      createUserDto.name,
      new Date().toISOString(),
      [],
    );

    try {
      return await this.userAccountRepo.create(userAccount);
    } catch (error) {
      if (error.code === '23505' && error.detail?.includes('email')) {
        throw new ConflictException('User with this email already exists');
      }

      throw new InternalServerErrorException(
        'Invalid email or user already exists',
      );
    }
  }
}
