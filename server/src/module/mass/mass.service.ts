import { Injectable } from '@nestjs/common';
import { CreateMassDto } from './dto/create-mass.dto';
import { UpdateMassDto } from './dto/update-mass.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mass } from './entities/mass.entity';

@Injectable()
export class MassService {
  constructor(@InjectRepository(Mass) private massRepository : Repository<Mass>) {}
  create(createMassDto: CreateMassDto) {
    return 'This action adds a new mass';
  }

  findAll() {

    return this.massRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} mass`;
  }

  update(id: number, updateMassDto: UpdateMassDto) {
    return `This action updates a #${id} mass`;
  }

  remove(id: number) {
    return `This action removes a #${id} mass`;
  }
}
