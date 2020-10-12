import { AppRoles } from '@/app.roles';
import { ApiProperty } from '@nestjs/swagger';
import { IPostModel, PostModel } from '@post/dto/post.model';
import { IsEmail, IsNotEmpty, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';

export interface IUserModel {
    id: string;
    username: string;
    email: string;
    name: string;
    avatarUrl: string;
    roles: AppRoles[];
    password: string;
    posts: IPostModel[];
    createdAt: Date;
    updatedAt: Date;
}

export class UserModel implements IUserModel {
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
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      {
          message: 'Too weak password. Require minimum 8 characters, at least 1 letter, 1 number and 1 special character',
      },
    )
    password: string;

    @ApiProperty()
    posts: PostModel[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
