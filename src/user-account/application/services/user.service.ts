import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { UserAccountRepositoryImpl } from '../../infrastructure/repositories/user-account.repository.impl';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UserAccountEntity } from '../../domain/entities/user-account.entity';

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

    return this.userAccountRepo.create(userAccount);
  }
}
