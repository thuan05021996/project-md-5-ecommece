import { BillDetail } from "src/module/bill_details/entities/bill_detail.entity";
import { Cart } from "src/module/cart/entities/cart.entity";
// import { Cart } from "src/module/cart/entities/cart.entity";
import { Category } from "src/module/category/entities/category.entity";
import { Comment } from "src/module/comment/entities/comment.entity";
import { Img } from "src/module/img/entities/img.entity";
import { Mass } from "src/module/mass/entities/mass.entity";
import { Product } from "src/module/product/entities/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity(
    "project_details"
)
export class ProjectDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type : "int",default : 100})
    stock : number

    @Column({type : "int"})
    price : number

    // @OneToMany(() => BillDetail, (billDetail) => billDetail.projectDetail)
    // billDetails: BillDetail

    @ManyToOne(() => Product, (product) => product.projectDetails)
    @JoinColumn({ name: "product_id" })
    product: Product

    @ManyToOne(() => Mass, (mass) => mass.projectDetails)
    @JoinColumn({ name: "mass_id" })
    mass: Mass

    @ManyToOne(() => Category, (category) => category.projectDetails)
    @JoinColumn({ name: "category_id" })
    category: Category

    @ManyToOne(() => Img, (img) => img.projectDetails)
    @JoinColumn({ name: "img_id" })
    img: Img

    @OneToMany(() => Comment, (comment) => comment.projectDetails)
    // @JoinColumn({ name: "comment_id" })
    comment: Comment

    // @OneToMany(() => Cart, (Cart) => Cart.ProjectDetail)
    // // @JoinColumn({ name: "comment_id" })
    // Cart: Cart
  
}
