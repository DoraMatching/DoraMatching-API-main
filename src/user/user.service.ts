import 'cross-fetch/polyfill'; // fix Headers is not defined of ghQuery
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { IViewer } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';
import { gql } from 'graphql-request';
import { IGithubSchema } from './dto/user.dto';
import * as pwGenerator from 'generate-password'
import { IGithubUserLangs } from './dto/user.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { mailAddress, feUrl } from '@/config';
import { UserRO } from './dto/response-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { LoginUserDTO } from './dto/login-user.dto';
import { PaginateParams } from '@/shared/pagination/paginate.params';
import { ghQuery } from '@/shared/graphql/github.graphql';
export interface IPagination<T> {
    items: T[];
    meta: any;
    links: any;
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly mailerService: MailerService
    ) { }

    async showAll({ limit, page, order, route }: PaginateParams): Promise<IPagination<UserRO>> {
        const { items, meta, links } = await paginate<UserEntity>(this.userRepository, { limit, page, route }, { order: { createdAt: order }, cache: true });

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

    async login(data: LoginUserDTO): Promise<UserRO> {
        const { username, password, email } = data;
        const user = await this.userRepository.findOne({ where: [{ username }, { email }] });
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username/password', HttpStatus.FORBIDDEN);
        }
        return user.toResponseObject();
    }

    async register(data: CreateUserDTO): Promise<UserRO> {
        const { username, email } = data;
        let user = await this.userRepository.findOne({ where: [{ username }, { email }] });
        if (user) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        user = await this.userRepository.create(data);
        await this.userRepository.save(user);
        return user.toResponseObject();
    }

    async getGithubProfile(accessToken: string): Promise<IViewer> {
        const query = gql`
        query { 
            viewer { 
                login
                email
                avatarUrl
                name
            }
          }
        `;

        const { viewer } = await ghQuery<IGithubSchema>(accessToken, query);
        return viewer;
    }

    async githubLogin(githubToken: string): Promise<UserRO> {
        const viewer = await this.getGithubProfile(githubToken);
        const { login, avatarUrl, name } = viewer;
        let { email } = viewer;

        email = email || `${login}@doramatching.tk`;

        let user = await this.userRepository.findOne({
            where: [{ username: login }, { email: email }]
        });
        if (!user) {
            const password = pwGenerator.generate({ length: 10, strict: true });
            user = await this.userRepository.create({ avatarUrl, email, username: login, name, password });

            await this.userRepository.save(user);

            this.mailerService.sendMail({
                to: email,
                from: mailAddress,
                subject: 'You have successfully registered an account on DoraMatching',
                template: 'welcome',
                context: {
                    name,
                    email,
                    password,
                    feLoginUrl: `${feUrl}/login`
                }
            });

            return user.toResponseObject(true);
        } else {
            return user.toResponseObject(true);
        }
    }

    async githubLangs(accessToken: string) {
        const query = gql`
        {
            viewer {
              repositories(ownerAffiliations: OWNER, isFork: false, first: 100) {
                nodes {
                  name
                  languages(first: 100, orderBy: {field: SIZE, direction: DESC}) {
                    edges {
                      size
                      node {
                        name
                      }
                    }
                  }
                }
              }
              name
            }
        }`;

        const result: IGithubUserLangs = { langs: {}, name: '' };
        const { viewer } = await ghQuery<any>(accessToken, query);
        const { repositories, name } = viewer;
        result.name = name;
        repositories.nodes.map(({ languages }) => {
            const langs = languages.edges;
            langs.map(({ size, node }) => {
                const langName = node.name;
                if (!result.langs[langName]) {
                    result.langs[langName] = size;
                } else {
                    result.langs[langName] += size;
                }
            })
        });

        return result;
    }
}
