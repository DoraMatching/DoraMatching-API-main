import { PostEntity } from '@post/entities';
import { ITagPostModel } from '@tag-post/dto';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('tag-post')
export class TagPostEntity extends BaseEntity implements ITagPostModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @ManyToMany(
        () => PostEntity,
        post => post.tags,
        { cascade: true, onDelete: 'CASCADE' },
    )
    posts: PostEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', default: 'tag-post', nullable: false })
    type: string;
}
