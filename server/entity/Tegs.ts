import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Product } from './Product';

@Entity()

export class Tegs {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
    teg: string;
}
