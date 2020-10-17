import { IUserModel, UserModel } from '@user/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export interface IQuestionModel {
    content: string;
    author: Partial<IUserModel>;
    createdAt?: string;
    updatedAt?: string;
}

export class QuestionModel implements IQuestionModel {
    @ApiProperty({ type: () => UserModel })
    author: Partial<IUserModel>;

    @ApiProperty()
    @IsString()
    content: string;

    @ApiProperty()
    createdAt: string;

    @ApiProperty()
    updatedAt: string;
}
