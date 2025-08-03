import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class DocumentGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  afterInit(server: Server) {
    /* server.path(): ruta del servidor */
    console.log(`🚀 Server initialized at ${server.path()}`);
  }
  
  handleConnection(client: Socket) {
    /* client.id: para identificar al cliente conectado */
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    /* client.id: para identificar al cliente conectado */
    console.log(`Client disconnected: ${client.id}`);
  }
}
