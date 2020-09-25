import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEmail, MinLength, MaxLength, Matches } from 'class-validator';
import { IUserModel } from './user.model';

export type ICreateUserDTO = Omit<IUserModel, 'id' | 'roles' | 'createdAt' | 'updatedAt'>;

export class CreateUserDTO implements ICreateUserDTO {
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