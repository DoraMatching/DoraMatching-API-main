import { AppRoles } from '@/app.roles';
import { ApiProperty } from '@nestjs/swagger';
import { PostRO } from '@post/dto';
import { QuestionRO } from '@question/dto';
import { IUserModel } from '@user/dto';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export type IUserRO = Omit<IUserModel, 'password'>;

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
    @IsOptional()
    @IsString()
    phoneNumber: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    avatarUrl: string;

    @ApiProperty()
    roles: AppRoles[];

    @ApiProperty({ type: () => PostRO, isArray: true })
    posts: PostRO[];

    @ApiProperty({ type: () => QuestionRO, isArray: true })
    questions: QuestionRO[];

    @ApiProperty()
    token?: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty({ type: () => String, default: 'user' })
    type?: string = 'user';
}
