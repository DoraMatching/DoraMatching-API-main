import { UserModel } from '@/modules/user/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IPostModel } from '@post/dto';
import { TagPostModel } from '@tag-post/dto/tag-post.model';

export type IPostRO = IPostModel;

export class PostRO implements IPostRO {
    @ApiProperty()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    subTitle: string;

    @ApiProperty()
    featuredImage: string;

    @ApiProperty()
    isDraft: boolean;

    @ApiProperty()
    content: string;

    @ApiProperty()
    tags: TagPostModel[];

    @ApiProperty({ type: () => UserModel })
    author: Partial<UserModel>;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}
