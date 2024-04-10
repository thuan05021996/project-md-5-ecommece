import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { BillService } from './bill.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';

@Controller('api/v1/bill')
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get('chart')
  findOne() {
    
    return this.billService.getRecentTotalBills();
  }
  @Post()
  create(@Body() createBillDto: any) {
    // console.log(createBillDto)
    return this.billService.create(createBillDto);
  }

  @Get()
  findAll() {
    return this.billService.findAll();
  }

  @Get(":id")
  getBillByUser(@Param("id") id: number) {
    return this.billService.getBillByUser(id);
  }


  @Put(':id')
  update(@Param('id') id: string,) {
    console.log(id)
    return this.billService.update(+id);
  }
  @Patch(':id')
  patch(@Param('id') id: string, ) {
    return this.billService.UserUpdate(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.billService.remove(+id);
  }
}
