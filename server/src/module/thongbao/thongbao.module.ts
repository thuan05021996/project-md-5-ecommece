import { Module } from '@nestjs/common';
import { ThongbaoService } from './thongbao.service';
import { ThongbaoController } from './thongbao.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thongbao } from './entities/thongbao.entity';
import { EventsGateway } from 'src/getaway/socket';

@Module({
  imports: [TypeOrmModule.forFeature([Thongbao])],
  controllers: [ThongbaoController],
  providers: [ThongbaoService,EventsGateway],
  exports: [ThongbaoService]
})
export class ThongbaoModule {}
