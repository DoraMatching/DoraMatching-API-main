import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { IUserModel } from './user.model';

export type ILoginUserDTO = Pick<IUserModel, 'username' | 'email' | 'password'>;

export class LoginUserDTO implements ILoginUserDTO {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}