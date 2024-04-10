import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BillDetailsService } from './bill_details.service';
import { CreateBillDetailDto } from './dto/create-bill_detail.dto';
import { UpdateBillDetailDto } from './dto/update-bill_detail.dto';

@Controller('api/v1/bill-details')
export class BillDetailsController {
  constructor(private readonly billDetailsService: BillDetailsService) {}

  @Post()
  async create(@Body() createBillDetailDto: any) {
    // console.log(createBillDetailDto,"11")  
    const {bill_id,listCart} = createBillDetailDto
    // console.log(listCart,"2222")
    try {
       await Promise.all(
          listCart.map(async (item) => {
            const {product_id,cart_quantity} = item
            // console.log(item,"333")
            const createBillDetail = await this.billDetailsService.create(bill_id,product_id,cart_quantity)
           const icreamStockProduct = await this.billDetailsService.icreamStockProduct(product_id,cart_quantity)
           return [createBillDetail,icreamStockProduct]
          })
       )
    } catch (error) {
      console.log(error)
    }
    // return this.billDetailsService.create(createBillDetailDto);
  }

  @Get()
  findAll() {
    console.log("123123")
    return this.billDetailsService.productbestSelling();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.billDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBillDetailDto: UpdateBillDetailDto) {
    return this.billDetailsService.update(+id, updateBillDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billDetailsService.remove(+id);
  }
}
