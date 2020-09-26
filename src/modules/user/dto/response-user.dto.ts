import { AppRoles } from '@/app.roles';
import { IPostModel } from '@/modules/post/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
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
    roles: AppRoles[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    posts: IPostModel[];

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    token?: string;
}