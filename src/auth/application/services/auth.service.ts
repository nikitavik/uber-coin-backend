import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtPayload } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from '../dto/login.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { UserService } from '../../../user-account/application/services/user.service';

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

  async signIn(signInDto: LoginDto): Promise<AuthResponseDto> {
    const { password, email } = signInDto;

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
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

  async register(createUserDto: RegisterUserDto): Promise<AuthResponseDto> {
    const newUser = await this.usersService.createUser(createUserDto);

    const signInDto: ExtendedJwtPayload = {
      sub: String(newUser.id),
      username: newUser.name,
      email: newUser.email,
    };

    return {
      accessToken: await this.jwtService.signAsync(signInDto),
    };
  }
}
