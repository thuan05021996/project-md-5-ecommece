import { Address } from "src/module/address/entities/address.entity";
import { Bill } from "src/module/bill/entities/bill.entity";
import { Cart } from "src/module/cart/entities/cart.entity";
// import { Cart } from "src/module/cart/entities/cart.entity";
import { Comment } from "src/module/comment/entities/comment.entity";
import { Thongbao } from "src/module/thongbao/entities/thongbao.entity";
import { Column, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 20, nullable: true })
    phone: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    email: string;

    @Column({
        type: 'varchar',
        length: 50,
        default: 'user',
       
      })
      role: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    password: string;

    @Column({
        type: 'varchar',
        length: 255,
        default:
          'https://res.cloudinary.com/dalz888e7/image/upload/v1684910195/my_image_user/default-user.jpg.jpg',
      })
      photo: string;
    
      @Column({ type: 'boolean', default: true })
      active: boolean;

      @OneToMany(() => Address, (address) => address.user, { cascade: true })
      address: Address

      @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
      comment: Comment

      @OneToMany(() => Bill, (bill) => bill.user)
      bill: Bill

      @OneToMany(() => Cart, (Cart) => Cart.user)
      Cart: Cart

      @ManyToMany(() => Thongbao)
      @JoinColumn()
      thongbao: Thongbao

     
}
