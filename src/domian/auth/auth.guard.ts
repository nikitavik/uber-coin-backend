import {
  CanActivate,
  ExecutionContext,
  Injectable,
  SetMetadata,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { FastifyRequest } from 'fastify';
import { Reflector } from '@nestjs/core';

export const IS_PUBLIC_KEY = 'isPublic';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      request['user'] = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromRequest(request: FastifyRequest): string | undefined {
    const authorizationHeader = request.headers;

    if (authorizationHeader) {
      const token = request.headers.bearer;

      if (token && typeof token === 'string') {
        return token;
      }
    }

    return undefined;
  }
}

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
