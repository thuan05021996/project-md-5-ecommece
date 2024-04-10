import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private cartRepository: Repository<Cart>,
  ) {}
  async create(productid: number, userid: number) {
    const checkcart = await this.findOne(userid, productid);
    // console.log(productid, userid,"qua check");
    // console.log(checkcart);
    if (checkcart.length > 0) {
      // console.log("222")
      const updateCart = await this.cartRepository
        .createQueryBuilder()
        .update(Cart)
        .set({ quantity: checkcart[0].quantity + 1 })
        .where('user_id = :user_id', { user_id: userid })
        .andWhere('Product = :Product', {
          Product: productid,
        })
        .execute();
      return {
        mesage: 'Thêm số lượng sản phẩm thành công',
        data: updateCart,
      };
    } else {
      console.log("111")
      const newCart = await this.cartRepository
        .createQueryBuilder()
        .insert()
        .into(Cart)
        .values({ user: userid as any, Product: productid as any, quantity: 1 })
        .execute();
      return {
        mesage: 'Thêm vào giỏ hàng thành công',
        data: newCart,
      };
    }
    // return 'This action adds a new cart';
  }

  async findAll(id: number) {
    const cart = await this.cartRepository.createQueryBuilder('cart')
    .innerJoinAndSelect('cart.Product', 'product')
    .innerJoinAndSelect("product.projectDetails","projectDetail")
    .innerJoinAndSelect("projectDetail.img","img")
    .innerJoinAndSelect("projectDetail.mass","mass")
      .where('user_id = :id', { id })
   
     .execute();
     return cart
    //  console.log(cart)
    // console.log(id);
    // const cart = await this.cartRepository
    //   .createQueryBuilder('cart')
 
    //  .innerJoinAndSelect('cart.ProjectDetail', 'projectdetail')
    //  .innerJoinAndSelect('projectdetail.product', 'product')
   
    //  .innerJoinAndSelect('projectdetail.img', 'img')
    //  .innerJoinAndSelect('projectdetail.mass', 'mass')
    //  .where('user_id = :id', { id })
   
    //  .execute();
    //  console.log(cart)
    // return cart;
    // return `This action returns all cart`; 
  }

  async findOne(userid: number, productid: any) {
    // console.log(userid,productid,"vao check")
    
    const checkCart = await this.cartRepository
      .createQueryBuilder()
      .select('*')
      .where('user_id = :user_id', { user_id: userid })
      .andWhere('Product_id = :Product_id', {
        Product_id: productid,
      })
      .execute();
    // return `This action returns a #${id} cart`;
    return checkCart;
  }

  async update(id: number, quantity: any) {
    // console.log(id,quantity)
    await this.cartRepository.update({ id: id }, { quantity: quantity });
    return `This action updates a #${id} cart`;
  }

  async remove(id: number) {
    await this.cartRepository.delete({ id: id });
    return `This action removes a #${id} cart`;
  }

  async deleteall(id: number) {
    console.log(id)
    await this.cartRepository.createQueryBuilder().delete().from(Cart).where("id = :id", { id: id }).execute();
return `This action removes a #${id} cart`;
  }

  async deletewithcart(id: number) {
    // await this.cartRepository.delete({ user_id: id });
    return `This action removes a #${id} cart`;
  }
}