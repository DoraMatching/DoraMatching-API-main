import { IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
    @ApiProperty()
    @IsNotEmpty()
    username: string;

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

export class UserLoginRegister {
    username: string;
    password: string;
}

export class UserRO {
    @ApiProperty()
    id: string;
    @ApiProperty()
    username: string;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    token?: string;
}