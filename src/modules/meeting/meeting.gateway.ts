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
import { TraineeRepository } from '@trainee/repositories';

@WebSocketGateway()
export class MeetingGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly logger = new Logger(MeetingGateway.name);

    constructor(private readonly traineeRepository: TraineeRepository) {}

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
    handleMessage(client: any, { room, text }: any): void {
        this.server.to(room).emit('msgToClient', text);
    }

    @SubscribeMessage('join_room')
    joinRoom(client: any, payload: any): void {
        client.join(payload);
    }

    @SubscribeMessage('leave_room')
    leaveRoom(client: any, payload: any): void {
        client.leave(payload);
    }

    @SubscribeMessage('load_room')
    async loadRoom(client: any, userId: any): Promise<void> {
        const trainee = await this.traineeRepository.getTraineeByUserId(userId);
        trainee.classes.map(classe => client.join(classe.id));
        client.join(userId);
    }
}
