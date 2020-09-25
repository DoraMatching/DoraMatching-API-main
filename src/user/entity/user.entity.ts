import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, BeforeInsert, UpdateDateColumn, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { config } from '@/shared/config';
import { UserRO } from '../dto/response-user.dto';
import { AppRoles } from '@/app.roles';
import { IUserModel } from '../dto/user.model';

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

    @Column('text')
    password: string;

    @Column({ type: 'simple-array', default: AppRoles.TRAINEE })
    roles: string[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10);
    }

    @BeforeInsert()
    setDefaultName(): void {
        this.name = this.username || this.email;
    }

    toResponseObject(showToken = true): UserRO {
        const { id, name, createdAt, updatedAt, username, token, roles, email, avatarUrl } = this;
        const responseObject: UserRO = { id, createdAt, updatedAt, username, email, name, roles, avatarUrl };
        if (showToken) {
            responseObject.token = token;
        }

        return responseObject;
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    private get token() {
        const { id, username, roles, email } = this;
        const { jwtSecretKey, jwtExpiresIn } = config;
        return jwt.sign(
            { id, username, roles, email: email ? email : undefined },
            jwtSecretKey,
            { expiresIn: jwtExpiresIn });
    }
}
