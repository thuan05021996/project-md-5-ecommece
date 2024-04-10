import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './module/user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { AddressModule } from './module/address/address.module';
import { Address } from './module/address/entities/address.entity';
import { ProductModule } from './module/product/product.module';
import { Product } from './module/product/entities/product.entity';
import { MassModule } from './module/mass/mass.module';
import { Mass } from './module/mass/entities/mass.entity';
import { ImgModule } from './module/img/img.module';
import { Img } from './module/img/entities/img.entity';
import { CategoryModule } from './module/category/category.module';
import { Category } from './module/category/entities/category.entity';
import { CommentModule } from './module/comment/comment.module';
import { Comment } from './module/comment/entities/comment.entity';
import { ProjectDetailsModule } from './module/project_details/project_details.module';
import { ProjectDetail } from './module/project_details/entities/project_detail.entity';
import { BillModule } from './module/bill/bill.module';
import { Bill } from './module/bill/entities/bill.entity';
import { BillDetailsModule } from './module/bill_details/bill_details.module';
import { BillDetail } from './module/bill_details/entities/bill_detail.entity';
import { Cart } from './module/cart/entities/cart.entity';
import { CartModule } from './module/cart/cart.module';
import { ConfigModule } from '@nestjs/config';
import { ThongbaoModule } from './module/thongbao/thongbao.module';
import { Thongbao } from './module/thongbao/entities/thongbao.entity';
import { EventsGateway } from './getaway/socket';
import { MailModule } from './module/mail/mail.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'project_md_5',
      entities: [
        User,
        Address,
        Product,
        Mass,
        Img,
        Category,
        Comment,
        ProjectDetail,
        Bill,
        BillDetail,
        Cart,
        Thongbao
        
      ],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    AddressModule,
    ProductModule,
    MassModule,
    ImgModule,
    CategoryModule,
    CommentModule,
    ProjectDetailsModule,
    BillModule,
    BillDetailsModule,
   CartModule,
   ConfigModule.forRoot(),
    
   ThongbaoModule,
   MailModule

  // MailModule
  ],
  controllers: [],
  providers: [EventsGateway],
})
export class AppModule {}
