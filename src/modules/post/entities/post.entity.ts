import { CommentPostEntity } from '@/modules/comment-post/entities/comment-post.entity';
import { TagPostEntity } from '@/modules/tag-post/entities/tag-post.entity';
import { UserEntity } from '@/modules/user/entities/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { IPostModel } from '../dto';

@Entity('post')
export class PostEntity extends BaseEntity implements IPostModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    title: string;

    @Column({ type: 'text', nullable: true })
    subTitle: string;

    @Column({ type: 'text', nullable: true })
    featuredImage: string;

    @Column({ type: 'boolean', nullable: false })
    isDraft: boolean;

    @Column({ type: 'text', nullable: false })
    content: string;

    @ManyToMany(() => TagPostEntity, tag => tag.posts, {
        cascade: ['insert', 'update', 'remove'],
        eager: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    @JoinTable()
    tags: TagPostEntity[];

    @ManyToOne(() => UserEntity, author => author.posts, { cascade: true, nullable: false })
    @JoinTable()
    author: UserEntity;

    @OneToMany(() => CommentPostEntity, comment => comment.post)
    @JoinTable()
    comments: CommentPostEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
