import { AppRoles } from '@/app.roles';
import { jwtExpiresIn, jwtSecretKey } from '@/config';
import { ClasseEntity } from '@classe/entities/classe.entity';
import { PostEntity } from '@post/entities/post.entity';
import { QuestionEntity } from '@question/entities/question.entity';
import { TopicEntity } from '@topic/entities/topic.entity';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { IUserModel, JwtUser, UserRO } from '../dto';

@Entity('user')
export class UserEntity implements IUserModel {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true, unique: true })
    email: string;

    @Column({ type: 'text', nullable: true })
    avatarUrl: string;

    @Column({ type: 'text', nullable: false })
    name: string;

    @Column({ type: 'text', unique: true })
    username: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'simple-array', default: AppRoles.TRAINEE })
    roles: AppRoles[];

    @OneToMany(() => PostEntity, post => post.author)
    posts: PostEntity[];

    @OneToMany(() => QuestionEntity, question => question.author)
    questions: QuestionEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ type: 'text', default: 'user', nullable: false })
    type: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @BeforeInsert()
    setDefaultName(): void {
        this.name = this.username || this.email;
    }

    @BeforeInsert()
    setDefaultAvatar(): void {
        this.avatarUrl = `https://robohash.org/${this.username}`;
    }

    toResponseObject(showToken = true): UserRO {
        const { id, name, createdAt, updatedAt, username, token, roles, email, avatarUrl, posts, questions, type } = this;
        const responseObject: UserRO = {
            id,
            createdAt,
            updatedAt,
            username,
            email,
            name,
            roles,
            avatarUrl,
            posts,
            questions,
            type
        };
        if (showToken) {
            responseObject.token = token;
        }

        return responseObject;
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token() {
        const { id, username, roles, email }: JwtUser = this;
        return jwt.sign(
            { id, username, roles, email: email ? email : undefined },
            jwtSecretKey,
            { expiresIn: jwtExpiresIn });
    }
}
