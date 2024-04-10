import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from '../user/user.module';
import { EventsGateway } from 'src/getaway/socket';
import { ThongbaoModule } from '../thongbao/thongbao.module';
import { Thongbao } from '../thongbao/entities/thongbao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product,Thongbao]), AuthModule, UserModule,ThongbaoModule],
  controllers: [ProductController],
  providers: [ProductService,EventsGateway],
  exports : [ProductService]
})
export class ProductModule {}
