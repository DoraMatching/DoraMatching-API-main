import { AppRoles } from '@/app.roles';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IUserModel } from '@user/dto';
import { QuestionRO } from '@question/dto';
import { PostRO } from '@post/dto';

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
