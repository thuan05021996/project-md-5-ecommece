import { Module } from '@nestjs/common';
import { ProjectDetailsService } from './project_details.service';
import { ProjectDetailsController } from './project_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectDetail } from './entities/project_detail.entity';
import { Img } from '../img/entities/img.entity';
import { Product } from '../product/entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from '../user/user.module';
import { EventsGateway } from 'src/getaway/socket';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectDetail, Img, Product]), AuthModule, UserModule],
  controllers: [ProjectDetailsController],
  providers: [ProjectDetailsService,EventsGateway],
  exports: [ProjectDetailsService],
})
export class ProjectDetailsModule {}
