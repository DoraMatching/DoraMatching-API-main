import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@user/repositories';
import { MeetingController } from './meeting.controller';
import { MeetingService } from './meeting.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserRepository])],
    controllers: [MeetingController],
    providers: [MeetingService],
})
export class MeetingModule {}
