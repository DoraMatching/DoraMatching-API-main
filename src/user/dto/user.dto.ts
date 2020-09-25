import { IsEmail, IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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