import { ApiProperty } from '@nestjs/swagger';
import { IUserModel } from '@user/dto';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

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
