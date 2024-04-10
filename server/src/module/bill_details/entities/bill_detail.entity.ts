import { Bill } from "src/module/bill/entities/bill.entity";
import { Product } from "src/module/product/entities/product.entity";
import { ProjectDetail } from "src/module/project_details/entities/project_detail.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("bill_details")
export class BillDetail {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    quantity: number;
    @ManyToOne(() => Bill, (bill) => bill.billDetails)
    @JoinColumn({ name: "bill_id" })
    bill: Bill;
    @ManyToOne(() => Product, (Product) => Product.BillDetail)
    @JoinColumn({ name: "Product_id" })
    Product: Product;
}
