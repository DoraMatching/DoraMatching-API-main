import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { IUserModel } from './user.model';

export type IUserRO = Omit<IUserModel, 'password'>

export class UserRO implements IUserRO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    avatarUrl: string;

    @ApiProperty()
    roles: string[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    token?: string;
}