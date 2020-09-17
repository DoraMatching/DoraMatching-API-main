import 'cross-fetch/polyfill';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginateParams } from 'src/shared/pipes.params';
import { Repository } from 'typeorm';
import { UserDTO, UserRO, GithubUser } from './user.dto';
import { UserEntity } from './user.entity';
import { GraphQLClient, gql } from 'graphql-request';
import { IGithubSchema } from './user.dto';
import * as pwGenerator from 'generate-password'
export interface IPagination<T> {
    items: T[];
    meta: any;
    links: any;
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) { }

    async showAll({ limit, page, order, route }: PaginateParams): Promise<IPagination<UserRO>> {
        const { items, meta, links } = await paginate<UserEntity>(this.userRepository, { limit, page, route }, { order: { id: order } });

        const result: IPagination<UserRO> = {
            items: items.map(user => user.toResponseObject(false)),
            meta, links
        }

        return result;
    }

    async findByUsernameOrEmail(username: string, email?: string): Promise<UserRO> {
        const user = await this.userRepository.findOne({
            where: [{ username }, { email }]
        });
        return user.toResponseObject(false);
    }

    async login(data: UserDTO): Promise<UserRO> {
        const { username, password } = data;
        const user = await this.userRepository.findOne({ where: { username } });
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username/password', HttpStatus.FORBIDDEN);
        }
        return user.toResponseObject();
    }

    async register(data: UserDTO): Promise<UserRO> {
        const { username, email } = data;
        let user = await this.userRepository.findOne({ where: [{ username }, { email }] });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject();
    }

    async getGithubUsername(accessToken: string): Promise<string> {
        const endpoint = 'https://api.github.com/graphql';

        const client = new GraphQLClient(endpoint);

        client.setHeader('authorization', `Bearer ${accessToken}`);

        const query = gql`
        query { 
            viewer { 
              login
            }
          }
        `;

        const { viewer } = await client.request<IGithubSchema, null>(query);
        return viewer.login;
    }

    async githubLogin(githubUser: GithubUser, githubToken: string) {
        const githubUsername = await this.getGithubUsername(githubToken);
        let user = await this.userRepository.findOne({
            where: [{ username: githubUsername }, { email: githubUser.email }]
        });
        if (!user) {
            const { photoURL, displayName, email } = githubUser;

            const pw = pwGenerator.generate({ length: 10, strict: true });
            user = await this.userRepository.create({ photoURL, email, username: githubUsername, name: displayName, password: pw });

            await this.userRepository.save(user);

            return user.toResponseObject(true);
        } else {
            return user.toResponseObject(true);
        }
    }
}
