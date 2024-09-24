import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryColumn()
  id: number;

  @Column({ default: 'unknown' })
  name: string;
}
