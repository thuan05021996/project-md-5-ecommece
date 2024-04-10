
import { User } from "src/module/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "address" })
export class Address {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ type: 'varchar', length: 255, nullable: false })
    xã: string;
    @Column({ type: 'varchar', length: 255, nullable: false })
    Phường: string;
    @Column({ type: 'varchar', length: 100, nullable: false })
    City: string;
    @ManyToOne(() => User, (user) => user.address)
    @JoinColumn({ name: 'user_id' })
    user: User

}
