import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', // Cambia esto al origen de tu cliente
    // origin: '*', // Permite conexiones desde cualquier origen
    // methods: ['GET', 'POST'], // Métodos permitidos
    // allowedHeaders: ['Content-Type'], // Encabezados permitidos
    // credentials: true, // Permite credenciales
  },
})
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
  /*creo un evento para escuchar al cliente*/
  @SubscribeMessage('ping')
  handlePing(client: Socket, payload: any): void {
    console.log(`Received ping from client ${client.id}:`, payload);
    /* Respondo a todos los clientes que esten conectados */
    this.server.emit('pong', {
      message: 'pong',
    });
    /* Respondo solo al cliente que envio el mensaje */
    // client.emit('pong', { message: 'pong' });
    /* Respondo a todos los clientes excepto al que envio el mensaje */
    // client.broadcast.emit('pong', { message: 'pong' });
    /* Respondo a un cliente especifico */
    /* this.server.to(client.id).emit('pong', {
      message: 'pong',
    }); */
  }
}
