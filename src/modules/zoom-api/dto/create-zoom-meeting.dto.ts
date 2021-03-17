import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { IZoomApiRO } from './response-zoom-api.dto';

export type ICreateZoomMeetingDTO = Pick<
    IZoomApiRO,
    'hostEmail' | 'password' | 'topic'
>;

export class CreateZoomMeetingDTO implements ICreateZoomMeetingDTO {
    @ApiProperty()
    @IsOptional()
    @IsEmail()
    hostEmail: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
            'Too weak password. Require minimum 8 characters, at least 1 letter, 1 number and 1 special character',
    })
    password: string;
    topic: string;
}
