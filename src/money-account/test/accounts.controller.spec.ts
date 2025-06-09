import { Test, TestingModule } from '@nestjs/testing';
import { MoneyAccountsController } from '../money-accounts.controller';

describe('AccountsController', () => {
  let controller: MoneyAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoneyAccountsController],
    }).compile();

    controller = module.get<MoneyAccountsController>(MoneyAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
