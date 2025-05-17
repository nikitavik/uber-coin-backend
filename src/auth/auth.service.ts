import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { LoginDto } from '../user-account/application/dto/login.dto';
import { RegisterUserDto } from '../user-account/application/dto/register-user.dto';
import { UserService } from '../user-account/application/services/user.service';

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

  async signIn(signInDto: LoginDto): Promise<{ accessToken: string }> {
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

    const signInDto: LoginDto = {
      email: newUser.email,
      password: createUserDto.password,
    };

    return await this.signIn(signInDto);
  }
}
