import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserAccount } from './user.entity';
import { RegisterUserDto } from '../../application/dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserAccount)
    private usersRepository: Repository<UserAccount>,
  ) {}

  async findAll(): Promise<UserAccount[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<UserAccount> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  findOneByEmail(email: string): Promise<UserAccount> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(createUserDto: RegisterUserDto): Promise<UserAccount> {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );

    const userPayload: RegisterUserDto = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
    };

    const newUser = this.usersRepository.create(userPayload);

    return this.usersRepository.save(newUser);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
