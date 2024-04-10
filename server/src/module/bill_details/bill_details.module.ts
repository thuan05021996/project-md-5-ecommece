import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BillDetailsService } from './bill_details.service';
import { BillDetailsController } from './bill_details.controller';
import { BillDetail } from './entities/bill_detail.entity';
import { ProjectDetail } from '../project_details/entities/project_detail.entity';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BillDetail, ProjectDetail,Product])],
  controllers: [BillDetailsController],
  providers: [BillDetailsService],
})
export class BillDetailsModule {}
