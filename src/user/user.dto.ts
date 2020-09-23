import { IsNotEmpty, MinLength, MaxLength, Matches, IsEmail, IsString, IsUrl, IsOptional, Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppRoles } from '../app.roles';
import { RolesValidator } from '../shared/roles.validate';

export class UserDTO {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty()
    name?: string = "DoraMatching user";

    @ApiProperty()
    avatarUrl: string;

    @ApiProperty()
    @Validate(RolesValidator)
    roles: AppRoles[] = [];

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
}

export class UserRO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    avatarUrl: string;

    @ApiProperty()
    roles: string[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    token?: string;
}

export class GithubUser {
    @ApiProperty()
    @IsString()
    displayName: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsUrl()
    photoURL: string;
}

export class GithubToken {
    @ApiProperty()
    accessToken: string;
}

export interface IViewer { // for Graphql
    login: string;
    email: string;
    avatarUrl: string;
    name: string;
}

export interface IGithubSchema { // for Graphql
    viewer?: IViewer;
}

export class GithubUserLogin {
    @ApiProperty()
    user?: GithubUser;

    @ApiProperty()
    accessToken: string;
}

export interface IGithubLang {
    name: string;
    size: number;
}

export interface IGithubUserLangs {
    langs: any;
    name: string;
}