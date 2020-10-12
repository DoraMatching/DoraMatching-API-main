import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsUrl, Matches, MaxLength, MinLength } from 'class-validator';
import { IUserModel } from './user.model';

export type ICreateUserDTO = Omit<IUserModel, 'id' | 'roles' | 'createdAt' | 'updatedAt' | 'posts'>;

export class CreateUserDTO implements ICreateUserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @Matches(/^[a-z0-9_-]{3,16}$/, {
        message: 'Invalid username'
    })
    username: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsOptional()
    @IsUrl()
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
