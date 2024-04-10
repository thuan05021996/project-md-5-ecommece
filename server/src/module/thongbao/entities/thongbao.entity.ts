// export class Thongbao {}
import { User } from 'src/module/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Thongbao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column({ default: false })
  isRead: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}