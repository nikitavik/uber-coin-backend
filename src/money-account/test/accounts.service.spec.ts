import { Test, TestingModule } from '@nestjs/testing';

import { MoneyAccountsService } from '../application/services/money-accounts.service';

describe('AccountsService', () => {
  let service: MoneyAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoneyAccountsService],
    }).compile();

    service = module.get<MoneyAccountsService>(MoneyAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
