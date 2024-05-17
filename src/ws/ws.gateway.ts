import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// cors 跨域配置
// @MessageBody 获取客户端消息
// @ConnectedSocket 实例化一个 socket
@WebSocketGateway(4001, { cors: { origin: '*' } })
export class WsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('client send', data);
    // 服务端响应，给客户端返回数据
    // 方案一：
    // this.server.emit('onMessage', {
    //   msg: 'new Message',
    //   cotent: data,
    // });
    // 方案二
    client.emit('onMessage', '456');
  }
}
