import { Injectable } from '@nestjs/common';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BillDetail } from './entities/bill_detail.entity';
import { Repository } from 'typeorm';
import { ProjectDetail } from '../project_details/entities/project_detail.entity';
import { Product } from '../product/entities/product.entity';

@Injectable()
export class BillDetailsService {
  constructor(
    @InjectRepository(BillDetail)
    private billDetailRepository: Repository<BillDetail>,
    @InjectRepository(ProjectDetail)
    private projectDetailRepository: Repository<ProjectDetail>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async create(bill_id: number, product_id: number, cart_quantity: number) {
    // console.log(bill_id, product_id, cart_quantity);
    // console.log(createBillDetailDto,"11")
    await this.billDetailRepository
      .createQueryBuilder()
      .insert()
      .into(BillDetail)
      .values({
        bill: bill_id as any,
        Product: product_id as any,
        quantity: cart_quantity,
      })
      .execute();
    // return 'This action adds a new billDetail';
  }

  async icreamStockProduct(id: number, quantity: number) {
    console.log(id,quantity)
    await this.projectDetailRepository
      .createQueryBuilder()
      .update(ProjectDetail)
      .set({ stock: () => 'stock - ' + quantity })
      .where('product = :product', { product: id })
      .execute();
  }

  async productbestSelling() {
    const listproduct = await this.findAll()
     console.log(listproduct)
    try {
      const listproduct1 = []
      await Promise.all(
        listproduct.map(async (item) => {
          const { id } = item;
          const product = await this.findOneProduct(id)
          // console.log(product)
         listproduct1.push(product);
          //  console.log(a,"11")
        })
        );
        return listproduct1
        // return listproduct
    } catch (error) {
      console.log(error);
    }
  }

async findOneProduct(id:number){
  console.log(id,"11111")
  const result = await this.productRepository
  .findOne({
    relations: [

      "projectDetails",
      'projectDetails.img',
      "projectDetails.mass",
    ],
    where: {
      id: id
    } 
  })
  
  return result
}
  async findAll() {
    console.log("1")
    const billDetail = await this.billDetailRepository
      .createQueryBuilder('billDetail')
      .select('billDetail.product_id', 'id')
      .addSelect('SUM(quantity)', 'quantity')
      // .leftJoinAndSelect('billDetail.Product', 'Product')
      // .leftJoinAndSelect('Product.projectDetails', 'projectDetails')
    //  .innerJoin('billDetail.Product', 'product')
    //  .innerJoin('product.projectDetails', 'projectDetails')
    //  .innerJoin('projectDetails.img', 'img')
     
      .groupBy('billDetail.product_id')
      // .orderBy('billDetail.quantity', 'ASC')
      .execute();
    return billDetail.sort((a, b) => b.quantity - a.quantity);
  }

  async findOne(id: number) {
    const result = await this.billDetailRepository.find({
      relations: [
        'Product',
        'Product.projectDetails',
        'Product.projectDetails.img',
      ],
      where: {
        bill: {
          id: id,
        },
      },
    });
    return result;
    // .createQueryBuilder("bill_details")
    // .innerJoinAndSelect('bill_details.product', 'product')
    // .innerJoinAndSelect('product.project_details', 'project_details')
    // .innerJoinAndSelect('project_details.img', 'img')
    // .innerJoinAndSelect('project_details.mass', 'mass')
    // .where('billDetail.bill_id = :id', { bill_id: id })
    // .execute();
    // return `This action returns a #${id} billDetail`;
  }

  update(id: number, updateBillDetailDto: UpdateBillDetailDto) {
    return `This action updates a #${id} billDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} billDetail`;
  }
}
