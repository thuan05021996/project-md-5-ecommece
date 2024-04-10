import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MassService } from './mass.service';
import { CreateMassDto } from './dto/create-mass.dto';
import { UpdateMassDto } from './dto/update-mass.dto';

@Controller('api/v1/mass')
export class MassController {
  constructor(private readonly massService: MassService) {}

  @Post()
  create(@Body() createMassDto: CreateMassDto) {
    return this.massService.create(createMassDto);
  }

  @Get()
  findAll() {
    return this.massService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.massService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMassDto: UpdateMassDto) {
    return this.massService.update(+id, updateMassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.massService.remove(+id);
  }
}
