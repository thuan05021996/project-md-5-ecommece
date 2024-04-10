import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ThongbaoService } from './thongbao.service';
import { CreateThongbaoDto } from './dto/create-thongbao.dto';
import { UpdateThongbaoDto } from './dto/update-thongbao.dto';

@Controller('thongbao')
export class ThongbaoController {
  constructor(private readonly thongbaoService: ThongbaoService) {}

  @Post()
  create(@Body() createThongbaoDto: CreateThongbaoDto) {
    return this.thongbaoService.create(createThongbaoDto);
  }

  @Get()
  findAll() {
    return this.thongbaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.thongbaoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThongbaoDto: UpdateThongbaoDto) {
    return this.thongbaoService.update(+id, updateThongbaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.thongbaoService.remove(+id);
  }
}
