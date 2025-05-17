import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';

import { Public } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';

import { LoginDto } from './application/dto/login.dto';
import { RegisterUserDto } from './application/dto/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  register(@Body(ValidationPipe) createUserDto: RegisterUserDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  signIn(@Body(ValidationPipe) signInDto: LoginDto) {
    return this.authService.signIn(signInDto);
  }
}
