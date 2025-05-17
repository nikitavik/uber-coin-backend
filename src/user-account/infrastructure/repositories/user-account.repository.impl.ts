import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { IUserAccountRepository } from '../../domain/repositories/user-account.repository';
import { UserAccountOrmEntity } from '../orm/user-account.orm-entity';
import { UserAccountEntity } from '../../domain/entities/user-account.entity';

@Injectable()
export class UserAccountRepositoryImpl implements IUserAccountRepository {
  constructor(
    @InjectRepository(UserAccountOrmEntity)
    private readonly repo: Repository<UserAccountOrmEntity>,
  ) {}

  private toEntity(ormEntity: UserAccountOrmEntity): UserAccountEntity {
    return new UserAccountEntity(
      ormEntity.id,
      ormEntity.email,
      ormEntity.password,
      ormEntity.name,
      ormEntity.createdAt,
      ormEntity.accounts,
    );
  }

  private toOrm(entity: UserAccountEntity): UserAccountOrmEntity {
    const ormEntity = new UserAccountOrmEntity();
    ormEntity.id = entity.id;
    ormEntity.email = entity.email;
    ormEntity.password = entity.password;
    ormEntity.name = entity.name;
    ormEntity.createdAt = entity.createdAt;
    ormEntity.accounts = entity.accounts;
    return ormEntity;
  }

  async findOneByEmail(email: string): Promise<UserAccountEntity> {
    const found = await this.repo.find({
      where: { email: email },
    });
    return this.toEntity(found[0]);
  }

  async create(account: UserAccountEntity): Promise<UserAccountEntity> {
    const saved = await this.repo.save(this.toOrm(account));
    return this.toEntity(saved);
  }

  async update(account: UserAccountEntity): Promise<UserAccountEntity> {
    await this.repo.update(account.id, this.toOrm(account));
    const updated = await this.repo.findOne({
      where: { id: account.id },
    });
    return this.toEntity(updated);
  }

  // TODO: Implement
  async delete(): Promise<void> {}
}
