import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class MeetingGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(MeetingGateway.name);

    @WebSocketServer() server: Server;

    afterInit(server: any) {
        this.logger.log('Server ws: ', 'Init');
    }

    handleConnection(client: any, ...args: any[]) {
        this.logger.log('Client connected: ', `${client.id}`);
    }

    handleDisconnect(client: any) {
        this.logger.log('Client disconnected: ', `${client.id}`);
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: any, payload: any): void {
        this.server.emit('msgToClient2', payload);
    }
}
