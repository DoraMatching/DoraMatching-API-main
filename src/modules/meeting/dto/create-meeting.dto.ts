import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IMeetingModel } from './meeting.model';

export type ICreateMeetingDTO = Pick<
    IMeetingModel,
    'topic' | 'meetingId' | 'password' | 'hostEmail'
>;

export class CreateMeetingDTO implements ICreateMeetingDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    topic: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    meetingId: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    hostEmail: string;
}
