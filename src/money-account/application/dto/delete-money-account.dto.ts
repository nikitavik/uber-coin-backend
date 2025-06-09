import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class DeleteMoneyAccountDto {
  @IsString()
  @IsUUID()
  @ApiProperty({
    format: 'uuid',
    description: 'UUID of the account',
    example: '1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p',
  })
  id: string;
}
