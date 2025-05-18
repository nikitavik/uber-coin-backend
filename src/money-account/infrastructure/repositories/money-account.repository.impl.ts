import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IMoneyAccountRepository } from '../../domain/repositories/money-account.repository';
import { MoneyAccountEntity } from '../../domain/entities/money-account.entity';

import { MoneyAccountOrmEntity } from '../orm/money-account.orm-entity';

@Injectable()
export class MoneyAccountRepositoryImpl implements IMoneyAccountRepository {
  constructor(
    @InjectRepository(MoneyAccountOrmEntity)
    private readonly repo: Repository<MoneyAccountOrmEntity>,
  ) {}

  private toDomain(ormEntity: MoneyAccountOrmEntity): MoneyAccountEntity {
    return new MoneyAccountEntity(
      ormEntity.id,
      ormEntity.name,
      ormEntity.amount,
      ormEntity.colorHex,
      ormEntity.userId,
    );
  }

  private toOrm(entity: MoneyAccountEntity): MoneyAccountOrmEntity {
    const ormEntity = new MoneyAccountOrmEntity();
    ormEntity.id = entity.id;
    ormEntity.name = entity.name;
    ormEntity.amount = entity.amount;
    ormEntity.colorHex = entity.colorHex;
    ormEntity.userId = entity.userId;
    return ormEntity;
  }

  async create(account: MoneyAccountEntity): Promise<MoneyAccountEntity> {
    const saved = await this.repo.save(this.toOrm(account));
    return this.toDomain(saved);
  }

  async update(account: MoneyAccountEntity): Promise<MoneyAccountEntity> {
    await this.repo.update(account.id, this.toOrm(account));
    const updated = await this.repo.findOne({
      where: { id: account.id },
    });
    return updated ? this.toDomain(updated) : null;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findAllByUserId(userId: string): Promise<MoneyAccountEntity[]> {
    const accounts = await this.repo.find({
      where: { id: userId },
    });
    return accounts.map(this.toDomain);
  }

  async findAll(): Promise<MoneyAccountEntity[]> {
    const account = await this.repo.find();
    return account.map(this.toDomain);
  }
}
