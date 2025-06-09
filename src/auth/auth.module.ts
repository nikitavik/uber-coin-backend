import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { jwtConstants } from './infrastructure/constants';
import { AuthGuard } from './auth.guard';
import { UserAccountModule } from '../user-account/user-account.module';
import { AuthController } from './auth.controller';
import { AuthService } from './application/services/auth.service';

@Module({
  imports: [
    UserAccountModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
