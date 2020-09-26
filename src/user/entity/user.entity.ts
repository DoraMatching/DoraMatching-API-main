import { AppRoles } from '@/app.roles';
import { jwtExpiresIn, jwtSecretKey } from '@/config';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { AvatarGenerator } from 'random-avatar-generator';
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IUserModel, UserRO, JwtUser } from '../dto';

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
    roles: AppRoles[];

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

    @BeforeInsert()
    setDefaultAvatar(): void {
        const generator = new AvatarGenerator();
        generator.generateRandomAvatar();
        this.avatarUrl = this.avatarUrl || generator.generateRandomAvatar(this.username);
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
        const { id, username, roles, email }: JwtUser = this;
        return jwt.sign(
            { id, username, roles, email: email ? email : undefined },
            jwtSecretKey,
            { expiresIn: jwtExpiresIn });
    }
}
