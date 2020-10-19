import { ICommentPostModel } from '@comment-post/dto';
import { PostEntity } from '@/modules/post/entities/post.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';

@Entity('comment-post')
export class CommentPostEntity extends BaseEntity implements ICommentPostModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    content: string;

    @ManyToOne(() => UserEntity, { nullable: false })
    author: UserEntity;

    @ManyToOne(() => PostEntity)
    post: PostEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
