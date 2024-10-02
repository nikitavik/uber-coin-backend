import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../../application/dto/register-user.dto';
import { SignInDto } from '../../application/dto/sign-in.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ access_token: string }> {
    const { password, email } = signInDto;

    const user = await this.usersService.findOneByEmail(email);

    const result = await bcrypt.compare(password, user.password);

    console.log(result, '**RESULT');

    if (!result) {
      throw new UnauthorizedException();
    }

    const jwtPayload = {
      sub: user.id,
      username: user.name,
      email: user.email,
    };

    return {
      access_token: await this.jwtService.signAsync(jwtPayload),
    };
  }

  async register(createUserDto: RegisterUserDto) {
    const newUser = await this.usersService.createUser(createUserDto);

    const signInDto: SignInDto = {
      email: newUser.email,
      password: createUserDto.password,
    };

    return await this.signIn(signInDto);
  }
}
