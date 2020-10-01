import { AppRoles } from '@/app.roles';
import { ApiProperty } from '@nestjs/swagger';
import { RolesValidator } from '@shared/validation/roles.validate';
import { ArrayUnique, IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength, Validate } from 'class-validator';
import { IUserModel } from './user.model';

export type IUpdateUser = Omit<IUserModel, 'id' | 'createdAt' | 'updatedAt' | 'posts'>;

export class UpdateUser implements IUpdateUser {
    @ApiProperty()
    @IsOptional()
    @IsString()
    username: string;

    @ApiProperty()
    @IsOptional()
    @IsEmail()
    email: string;

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
    @Matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      {
          message: 'Too weak password. Require minimum 8 characters, at least 1 letter, 1 number and 1 special character',
      },
    )
    password: string;

    @ApiProperty()
    @IsOptional()
    oldPassword: string;
}
