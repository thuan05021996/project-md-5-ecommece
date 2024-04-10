import { BillDetail } from 'src/module/bill_details/entities/bill_detail.entity';
import { User } from 'src/module/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity('bill')
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  phone: string;

  // @Column()
  // creat_at : Date;
  @Column({type:"date"})
  created_at: Date;

  @Column({
    type: 'enum',
    enum: ['Đang chờ', 'Đã xác nhận ', 'Huỷ'],
    default: 'Đang chờ',
  })
  status: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'int', nullable: true })
  total_money: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  nameBill: string;

  @OneToMany(() => BillDetail, (billDetail) => billDetail.bill)
  billDetails: BillDetail;

  @ManyToOne(() => User, (user) => user.bill)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
