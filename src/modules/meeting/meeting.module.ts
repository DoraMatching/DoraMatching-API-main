import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories';
import { TrainerRepository } from '@trainer/repositories';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';
import { MeetingRepository } from './repositories';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, MeetingRepository, TrainerRepository]),
    ],
    controllers: [MeetingController],
    providers: [MeetingService],
})
export class MeetingModule {}
