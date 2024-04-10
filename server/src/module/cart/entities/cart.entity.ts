import { Product } from 'src/module/product/entities/product.entity';
// import { ProjectDetail } from 'src/module/project_details/entities/project_detail.entity';
import { User } from 'src/module/user/entities/user.entity';
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm';
@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id : number

    @Column()
    quantity : number

    @ManyToOne((type) => User, (User) => User.Cart)
    @JoinColumn({ name: 'user_id' })
    user : User

    @ManyToOne((type) => Product, (Product) => Product.Cart)
    @JoinColumn({ name: 'Product_id' })
    Product : Product
}   
