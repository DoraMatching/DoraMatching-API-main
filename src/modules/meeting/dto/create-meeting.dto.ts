import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { IMeetingModel } from './meeting.model';

export type ICreateMeetingDTO = Pick<
    IMeetingModel,
    'topic' | 'meetingId' | 'password' | 'hostEmail' | 'agenda'
>;

export class CreateMeetingDTO implements ICreateMeetingDTO {
    @ApiProperty()
    @IsOptional()
    @IsString()
    topic: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    agenda: string;

    @ApiProperty()
    @IsOptional()
    @IsUUID()
    classeId: string;

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

    @ApiProperty()
    @IsOptional()
    @IsDate()
    schedule: Date;

    @ApiProperty()
    @IsOptional()
    @IsString()
    lessonName: string;
}
