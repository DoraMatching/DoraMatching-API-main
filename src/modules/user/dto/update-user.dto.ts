import { AppRoles } from '@/app.roles';
import { RolesValidator } from '@/shared';
import { ApiProperty } from '@nestjs/swagger';
import { IUserModel } from '@user/dto';
import {
    ArrayUnique,
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength,
    Validate,
} from 'class-validator';

export type IUpdateUser = Omit<
    IUserModel,
    | 'id'
    | 'createdAt'
    | 'updatedAt'
    | 'posts'
    | 'questions'
    | 'topics'
    | 'classes'
    | 'roles'
>;

export class UpdateUserDTO implements IUpdateUser {
    @ApiProperty()
    @IsOptional()
    @IsString()
    @Matches(/^[a-z0-9_-]{3,16}$/, {
        message: 'Invalid username',
    })
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
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsOptional()
    avatarUrl: string;

    @ApiProperty()
    @IsOptional()
    @ArrayUnique()
    @Validate(RolesValidator)
    roles: AppRoles[];

    @ApiProperty()
    @IsOptional()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message:
            'Too weak password. Require minimum 8 characters, at least 1 letter, 1 number and 1 special character',
    })
    password: string;

    @ApiProperty()
    @IsOptional()
    oldPassword: string;
}
