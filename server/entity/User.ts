import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated, Unique, OneToMany } from 'typeorm';
import { Product } from './Product';

export enum UserRole {
    ADMIN = 'admin',
    User = 'user',
}

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
    id: number;

  @Column()
  @Generated('uuid')
    uuid: string;

  @Column()
    email: string;

  @Column({
    enum: UserRole,
    default: UserRole.User,
    nullable: true
  })
    role: UserRole;

  @Column()
    firstName: string;

  @Column()
    lastName: string;

  @Column('varchar')
    hashpassword: string;

  @Column()
    salt: string;

  @Column({ type: 'simple-json', default: { t: '0', expires_at: '0' }, nullable: true })
    token: {t: string, expires_at: string};

  @CreateDateColumn()
    createDate: Date;

  @UpdateDateColumn()
    updateDate: Date;

  @OneToMany(() => Product, (product) => product.user)
    products: Product[];
}
