import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from './config';
import { GqlExecutionContext } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/user/user.entity';
import { Repository } from 'typeorm';
import { AppRoles } from '@/app.roles';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    async attachUser(authorization: string): Promise<any> {
        if (!authorization) {
            return this.userRepository.create({ roles: [AppRoles.GUEST] });
        } else {
            return await this.validateToken(authorization);
        }
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (request) { // for JWT authen
            const { authorization } = request.headers;

            request.user = await this.attachUser(authorization);

            return true;
        } else { // for GraphQL authen
            const ctx: any = GqlExecutionContext.create(context).getContext();
            const { authorization } = ctx.headers;

            ctx.user = await this.attachUser(authorization);

            return true;
        }
    }

    async validateToken(auth: string): Promise<any> {
        const [tokenType, token] = auth.split(' ');
        const { jwtSecretKey } = config;
        if (tokenType !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.FORBIDDEN);
        }
        try {
            const decode = await jwt.verify(token, jwtSecretKey);
            return decode;
        } catch (e) {
            const message = `Token error: ${e.message || e.name}`;
            throw new HttpException(message, HttpStatus.FORBIDDEN);
        }
    }
}