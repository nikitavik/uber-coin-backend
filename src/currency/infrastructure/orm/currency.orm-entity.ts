import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class CurrencyOrmEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
