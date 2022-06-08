import { Column, Entity, Generated, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity()

export class Product {
    @PrimaryGeneratedColumn()
      id: number;

    @Column()
    @Generated('uuid')
      uuid: string;

    @Column()
      userUuid: string;

    @Column()
      title: number;

    @Column()
      tel: number;

    @Column()
      teg: number;

    @Column()
      price: number;

    @Column()
      about: string;

    @Column({ type: 'simple-json', default: [], nullable: true })
      photoUrl: string;

    @Column()
      address: string;

    @Column({ type: 'simple-json', default: { t: '0', expires_at: '0' }, nullable: true })
      mapXY: {x: number, y: number};

    @ManyToOne(() => User, (user) => user.products)
      user: User;
}
