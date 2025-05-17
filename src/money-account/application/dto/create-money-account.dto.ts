import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Matches } from 'class-validator';

export class CreateMoneyAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'My Account' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^#([0-9A-F]{6}|[0-9A-F]{3})$/i, {
    message: 'color_hex must be a valid hexadecimal color code',
  })
  @ApiProperty({
    example: '#FFFFFF',
    description: 'Hexadecimal color code',
    pattern: '^#([0-9A-F]{6}|[0-9A-F]{3})$',
  })
  colorHex: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  currencyId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  amount: number;
}
