import { ApiProperty } from '@nestjs/swagger';
import { ITagPostModel } from '@tag-post/dto';

export type ITagPostRO = ITagPostModel;

export class TagPostRO implements ITagPostRO {
    @ApiProperty()
    name: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
