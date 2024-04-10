import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from 'src/auth/guard/author.guards';
import { AuthGuard } from 'src/auth/guard/auth.guards';
import { EventsGateway } from 'src/getaway/socket';

@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService,
    private socket : EventsGateway) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body()  UpdateProductDto : any) {
    console.log("1")
    // this.socket.notifyClientsOfUpdate("update thanh cong")
    return this.productService.updateSale(+id, UpdateProductDto);
  }

  @Put('cancelSale/:id')
  cancelSale(@Param('id') id: string, ) {
    return this.productService.cancelSale(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
