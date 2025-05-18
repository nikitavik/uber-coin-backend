import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('currency')
export class CurrencyOrmEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
