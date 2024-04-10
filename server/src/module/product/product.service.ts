import { EventsGateway } from 'src/getaway/socket';
import { Socket } from 'socket.io';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Thongbao } from '../thongbao/entities/thongbao.entity';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private productRepository : Repository<Product>,
  @InjectRepository(Thongbao) private thongbaorepo : Repository<Thongbao>, private socket : EventsGateway) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
// sale sản phẩm
  async updateSale(id: number, updateProductDto: any) {
    // console.log(id, updateProductDto)
    const result = await this.productRepository.createQueryBuilder().update().set({
      discount: 1 - updateProductDto.discount
    }).where("id = :id", { id: id }).execute();

    // tạo thông báo
    const thongbao = await this.thongbaorepo.create({
      title : "Giảm giá sản phẩm",
      message: `Sản phẩm có tên ${updateProductDto.name} là đang được giảm giá ${1 -updateProductDto.discount}`

    })
    // gửi thông báo tới người dùng
    this.socket.sendProductDiscountNotification(thongbao)
    return {
      mesage: "Đã giảm giá sản phẩm" ,
      data: result
    }
  }


  // khong sale nua

  async cancelSale(id: number, ) {
    const result = await this.productRepository.createQueryBuilder().update().set({
      discount: 1
    }).where("id = :id", { id: id }).execute();
    return {
      mesage: "Đã huỷ giám giá sản phẩm" ,
      data: result
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
