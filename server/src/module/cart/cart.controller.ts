import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() createCartDto: any) {
    // console.log(createCartDto);
    const { user_id, product_id } = createCartDto;
    return this.cartService.create(product_id,user_id,);
  }

  @Get(":id")
  findAll(@Param("id") id: number) {
    // console.log(id,"đã vào")
    return this.cartService.findAll(id);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.cartService.findOne(+id);
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCartDto: any) {
  const {quantity} = updateCartDto
  // console.log(quantity)
    return this.cartService.update(+id, quantity);
  }

  @Delete('deleteone/:id')
  remove(@Param('id') id: string) {
    console.log("11")
    console.log(id)

    return this.cartService.remove(+id);
  }
  
  @Delete('delete/:id')   
  deleteall(@Param('id') id: string) {
    console.log("2222")

    return this.cartService.deleteall(+id); 
  }

  @Delete("deletewithcarrt")
  async deletewithcart(@Body() cart: any) {
    console.log("333")
    console.log(cart,"đay là cart để xoá")
    try {
      await Promise.all(
        cart.map(async (item) => {
          const { cart_id } = item
          return await this.cartService.remove(cart_id)
        })
      )
    } catch (error) {
      console.log(error)
    }
    // return this.cartService.deletewithcart(cart); 
  }
}
