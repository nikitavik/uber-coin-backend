import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { RegisterUserDto } from '../../application/dto/register-user.dto';
import { SignInDto } from '../../application/dto/sign-in.dto';

import * as bcrypt from 'bcrypt';

// TODO: Move somewhere
export type ExtendedJwtPayload = JwtPayload & {
  username: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { password, email } = signInDto;

    const user = await this.usersService.findOneByEmail(email);

    const result = await bcrypt.compare(password, user.password);

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    if (!result) {
      throw new UnauthorizedException();
    }

    const jwtPayload: ExtendedJwtPayload = {
      sub: String(user.id),
      username: user.name,
      email: user.email,
    };

    return {
      accessToken: await this.jwtService.signAsync(jwtPayload),
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
