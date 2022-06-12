import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
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
      title: string;

    @Column()
      tel: number;

    @Column()
      teg: number;

    @Column()
      price: number;

    @Column()
      about: string;

    @Column({ type: 'simple-json',
    // default: '',
      nullable: true })
      photoUrl: string;

    @Column()
      address: string;

    @Column({ type: 'simple-json', default: { t: '0', expires_at: '0' }, nullable: true })
      mapXY: {x: number, y: number};

    // @Column({ type: 'simple-json', default: { count: 0, viewsIp: '' }, nullable: true })
    //   views: { count: number, viewsIp: string };
    // ======> сложная реализация должна быть через связь
    // многие со многими с отдельной статистикой по просмотрам.

    @Column({ default: 0, nullable: true })
      views: number;

    @ManyToOne(() => User, (user) => user.products)
      user: User;

    @CreateDateColumn({ type: 'timestamp with time zone' })
      createDate: Date;

    @UpdateDateColumn({ type: 'timestamp with time zone' })
      updateDate: Date;
}
