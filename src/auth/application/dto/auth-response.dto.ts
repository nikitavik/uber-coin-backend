import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDto {
  @ApiProperty({ example: 'jwt.token.here' })
  accessToken: string;
}
