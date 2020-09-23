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

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        if (request) { // for JWT authen
            const { authorization } = request.headers;

            if (!authorization) {
                request.user = this.userRepository.create({ roles: [AppRoles.GUEST] });
            } else {
                request.user = await this.validateToken(authorization);
            }

            return true;
        } else { // for GraphQL authen
            const ctx: any = GqlExecutionContext.create(context).getContext();
            const { authorization } = ctx.headers;

            if (!authorization) {
                request.user = this.userRepository.create({ roles: [AppRoles.GUEST] });
            } else {
                request.user = await this.validateToken(authorization);
            }

            ctx.user = await this.validateToken(authorization);
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