import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { Public } from './auth.guard';

import { AuthResponseDto } from './application/dto/auth-response.dto';
import { RegisterUserDto } from './application/dto/register-user.dto';
import { LoginDto } from './application/dto/login.dto';
import { AuthService } from './application/services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  @ApiResponse({ status: 200, type: AuthResponseDto })
  register(
    @Body(ValidationPipe) createUserDto: RegisterUserDto,
  ): Promise<AuthResponseDto> {
    return this.authService.register(createUserDto);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @Post('/login')
  signIn(@Body(ValidationPipe) signInDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.signIn(signInDto);
  }
}
