import 'cross-fetch/polyfill'; // fix Headers is not defined of ghQuery
import { AppResources } from '@/app.roles';
import { feUrl, isEnableCache, mailAddress } from '@/config';
import {
    ghQuery,
    grantPermission,
    IPagination,
    paginateFilter,
    paginateOrder,
    PaginateParams,
    rolesFilter,
} from '@/shared';
import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TraineeRepository } from '@trainee/repositories';
import {
    CreateUserDTO,
    IGithubSchema,
    IGithubUserLangs,
    IUserRO,
    IViewer,
    JwtUser,
    LoginUserDTO,
    UpdateUserDTO,
    UserModel,
    UserRO,
} from '@user/dto';
import { UserEntity } from '@user/entities';
import { UserRepository } from '@user/repositories';
import * as bcrypt from 'bcryptjs';
import * as pwGenerator from 'generate-password';
import { gql } from 'graphql-request';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly mailerService: MailerService,
        private readonly traineeRepository: TraineeRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {}

    async showAll(
        { limit, page, order, route }: PaginateParams,
        jwtUser: JwtUser,
    ): Promise<IPagination<IUserRO>> {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.USER,
            'read',
            jwtUser,
            null,
        );

        if (permission.granted) {
            const { items, meta, links } = await paginate<UserEntity>(
                this.userRepository,
                {
                    limit,
                    page,
                    route,
                },
                { order: { createdAt: order }, cache: isEnableCache },
            );

            const result = paginateOrder<UserRO>(
                {
                    items: items.map(user => user.toResponseObject(false)),
                    links,
                    meta,
                },
                order,
            );

            return paginateFilter<UserRO>(result, permission);
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async getUserById({ id }: Partial<UserModel>, jwtUser: JwtUser): Promise<UserRO> {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.USER,
            'read',
            jwtUser,
            id,
        );
        if (permission.granted) {
            // const user = await this.userRepository.findOne({ where: { id }, cache: isEnableCache });
            const user = await this.userRepository.getUserById(id);
            if (user) {
                const result = user.toResponseObject(false);
                return permission.filter(result);
            } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async findByUsernameOrEmail(username: string, email?: string): Promise<UserRO> {
        const user = await this.userRepository.findOne({
            where: [{ username }, { email }],
        });
        return user.toResponseObject(false);
    }

    async login(data: LoginUserDTO): Promise<UserRO> {
        const { username, password, email } = data;
        const user = await this.userRepository.findOne({
            where: [{ username }, { email }],
        });
        if (!user || !(await user.comparePassword(password))) {
            throw new HttpException('Invalid username/password', HttpStatus.FORBIDDEN);
        }
        return user.toResponseObject();
    }

    async register(data: CreateUserDTO, jwtUser: JwtUser): Promise<UserRO> {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.USER,
            'create',
            jwtUser,
            null,
        );
        if (permission.granted) {
            data = permission.filter(data);

            const { username, email } = data;
            let user = await this.userRepository.findOne({
                where: [{ username }, { email }],
            });
            if (user) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            }
            user = this.userRepository.create(data);
            user = await this.userRepository.save(user);
            const trainee = this.traineeRepository.create({
                user,
            });
            await this.traineeRepository.save(trainee);
            return user.toResponseObject();
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async updateUser(
        id: string,
        updateUser: UpdateUserDTO,
        jwtUser: JwtUser,
    ): Promise<UserRO> {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.USER,
            'update',
            jwtUser,
            id,
        );
        if (permission.granted) {
            updateUser = permission.filter(updateUser);
            if (updateUser.roles)
                updateUser.roles = rolesFilter(jwtUser.roles, updateUser.roles);

            const foundUser = await this.userRepository.findOne({ id });

            if (foundUser) {
                // Object.keys(updateUser).forEach(key => {
                //     if (key === 'password' && updateUser['password']) {
                //         foundUser.password = updateUser.password;
                //     } else
                //         foundUser[key] = updateUser[key];
                // });
                if (updateUser['password'])
                    updateUser['password'] = await bcrypt.hash(updateUser.password, 10);

                try {
                    await this.userRepository.update(foundUser.id, updateUser);
                } catch ({ detail }) {
                    throw new HttpException(
                        detail || 'OOPS!',
                        HttpStatus.INTERNAL_SERVER_ERROR,
                    );
                }
                return (await this.userRepository.findOne({ id })).toResponseObject(
                    false,
                );
            } else throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
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
            where: [{ username: login }, { email }],
        });
        if (!user) {
            const password = pwGenerator.generate({ length: 10, strict: true });
            user = this.userRepository.create({
                avatarUrl,
                email,
                username: login,
                name,
                password,
            });

            user = await this.userRepository.save(user);

            const trainee = this.traineeRepository.create({
                user,
            });
            await this.traineeRepository.save(trainee);

            await this.mailerService.sendMail({
                to: email,
                from: mailAddress,
                subject: 'You have successfully registered an account on DoraMatching',
                template: 'welcome',
                context: {
                    name,
                    email,
                    password,
                    feLoginUrl: `${feUrl}/login`,
                },
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
                            languages(
                                first: 100
                                orderBy: { field: SIZE, direction: DESC }
                            ) {
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
            }
        `;

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
            });
        });

        return result;
    }
}
