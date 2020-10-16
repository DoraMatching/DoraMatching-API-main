import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ICommentPostModel } from '@comment-post/dto';
import { UserEntity } from '@user/entity/user.entity';
import { PostEntity } from '@post/entity/post.entity';

@Entity('comment-post')
export class CommentPostEntity extends BaseEntity implements ICommentPostModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, { nullable: false })
    author: UserEntity;

    @ManyToOne(() => PostEntity)
    post: PostEntity;

    @UpdateDateColumn()
    updatedAt: Date;
}
