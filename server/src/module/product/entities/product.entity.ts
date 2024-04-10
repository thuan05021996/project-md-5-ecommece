import { BillDetail } from "src/module/bill_details/entities/bill_detail.entity";
import { Cart } from "src/module/cart/entities/cart.entity";
import { ProjectDetail } from "src/module/project_details/entities/project_detail.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "product" })
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ type: 'varchar', length: 255, nullable: false })
    name: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    orgin: string;

    @Column({ type: 'varchar', length: 255, nullable: false })
    descripstion: string;

    @Column({ type: 'decimal',precision: 10, scale: 2 , nullable: false, default: 1 })
    discount: number;

    @OneToMany(() => ProjectDetail, (projectDetail) => projectDetail.product)
    projectDetails: ProjectDetail

    @OneToMany(() => BillDetail, (BillDetail) => BillDetail.Product)
    BillDetail: BillDetail

    @OneToMany(() => Cart, (Cart) => Cart.Product)
    Cart: BillDetail
    
}
