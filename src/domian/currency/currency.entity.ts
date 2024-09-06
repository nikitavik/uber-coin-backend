import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class Currency {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
