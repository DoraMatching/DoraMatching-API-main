import { ClasseRepository } from '@classe/repositories';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraineeRepository } from '@trainee/repositories';
import { TrainerRepository } from '@trainer/repositories';
import { UserRepository } from '@user/repositories';
import { ZoomApiModule } from '@zoom-api/zoom-api.module';
import { MeetingController } from './meeting.controller';
import { MeetingGateway } from './meeting.gateway';
import { MeetingService } from './meeting.service';
import { MeetingRepository } from './repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
            MeetingRepository,
            TrainerRepository,
            ClasseRepository,
            TraineeRepository,
        ]),
        ZoomApiModule,
    ],
    controllers: [MeetingController],
    providers: [MeetingService, MeetingGateway],
    exports: [MeetingGateway, MeetingService],
})
export class MeetingModule {}
