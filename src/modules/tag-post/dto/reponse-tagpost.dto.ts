import { ApiProperty } from '@nestjs/swagger';
import { PostRO } from '@post/dto';
import { ITagPostModel } from '@tag-post/dto';

export type ITagPostRO = Omit<ITagPostModel, 'posts'>;

export class TagPostRO implements ITagPostRO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    posts?: PostRO[];

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}