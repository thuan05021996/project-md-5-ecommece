import { Injectable } from '@nestjs/common';
import { CreateThongbaoDto } from './dto/create-thongbao.dto';
import { UpdateThongbaoDto } from './dto/update-thongbao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Thongbao } from './entities/thongbao.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ThongbaoService {
  constructor(@InjectRepository(Thongbao) private thongbaorepo : Repository<Thongbao>) {}
  // @InjectRepository(ProjectDetail)
  // private projectDetailRepository: Repository<ProjectDetail>,
  async create(createThongbaoDto: any):Promise<any> {
   const newThongbao = await this.create(createThongbaoDto)
   return await this.thongbaorepo.save(newThongbao)
  }

  findAll() {
    return `This action returns all thongbao`;
  }

  findOne(id: number) {
    return `This action returns a #${id} thongbao`;
  }

  update(id: number, updateThongbaoDto: UpdateThongbaoDto) {
    return `This action updates a #${id} thongbao`;
  }

  remove(id: number) {
    return `This action removes a #${id} thongbao`;
  }
}
