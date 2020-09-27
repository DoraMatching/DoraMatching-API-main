import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { IPostModel } from "./post.model";

export type ICreatePostDTO = Omit<IPostModel, 'id' | 'author' | 'createdAt' | 'updatedAt'>;

export class CreatePostDTO implements ICreatePostDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(43, { message: 'The text you wrote is shorter than "The quick brown fox jumps over the lazy dog"! Please write more...' })
    content: string;

    @IsOptional()
    tags: string[];
}