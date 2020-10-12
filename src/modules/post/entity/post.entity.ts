import { UserEntity } from '@user/entity/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IPostModel } from '../dto';
import { TagPostEntity } from '@tag-post/entity/tag-post.entity';

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

    @ManyToMany(() => TagPostEntity, tag => tag.posts, { eager: true })
    @JoinTable()
    tags: TagPostEntity[];

    @ManyToOne(() => UserEntity, author => author.posts, { cascade: true })
    @JoinTable()
    author: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
