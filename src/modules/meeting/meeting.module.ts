import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories';
import { TrainerRepository } from '@trainer/repositories';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingRepository } from './repositories';
import { ZoomApiModule } from '../zoom-api/zoom-api.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, MeetingRepository, TrainerRepository]),
        ZoomApiModule,
    ],
    controllers: [MeetingController],
    providers: [MeetingService],
})
export class MeetingModule {}
