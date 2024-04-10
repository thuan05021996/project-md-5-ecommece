import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
// import { ThongbaoService } from 'src/module/thongbao/thongbao.service';
// import { Thongbao } from 'src/module/thongbao/entities/thongbao.entity';
  
  @WebSocketGateway({ cors: true })

  export class EventsGateway {
    @WebSocketServer()
    server: Server;
  
    sendProductDiscountNotification(product: any): void {
      // Gửi thông báo giảm giá sản phẩm đến tất cả người dùng
      this.server.emit('productDiscount', product
        // id: product.id,
        // name: product.name,
        // // price: product.price,
        // discountRate: product.discountRate,
        // // Các thông tin khác của sản phẩm
      );
    }
  }
 
   


//   import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
// import { Server } from 'socket.io';
// import { NotificationsService } from './notifications.service';

// @WebSocketGateway()
// export class NotificationsGateway {
//   @WebSocketServer()
//   server: Server;

//   constructor(private readonly notificationsService: NotificationsService) {}

//   async sendToAll(message: string): Promise<void> {
//     // Lưu thông báo vào cơ sở dữ liệu
//     const notification = await this.notificationsService.create({
//       message,
//       // ...thêm các trường thông tin khác như ngày giờ, người gửi, v.v.
//     });

//     // Gửi thông báo đến tất cả client kết nối
//     this.server.emit('receiveNotification', notification);
//   }
// }