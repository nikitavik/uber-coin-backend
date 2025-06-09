import { PartialType } from '@nestjs/swagger';
import { CreateMoneyAccountDto } from './create-money-account.dto';

export class UpdateMoneyAccountDto extends PartialType(CreateMoneyAccountDto) {}
