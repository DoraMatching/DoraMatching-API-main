import { AppResources } from '@/app.roles';
import {
    customPaginate,
    grantPermission,
    IPagination,
    PaginateParams,
} from '@/shared';
import { IHomeRO, UserListRO } from '@home-modules/dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostRepository } from '@post/repositories';
import { QuestionRepository } from '@question/repositories';
import { JwtUser } from '@user/dto';
import { UserRepository } from '@user/repositories';
import _ from 'lodash';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class HomeService {
    constructor(
        private readonly postRepository: PostRepository,
        private readonly questionRepository: QuestionRepository,
        private readonly userRepository: UserRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {}

    async getAll(
        pagOpts: PaginateParams,
        jwtUser: JwtUser,
    ): Promise<IPagination<IHomeRO>> {
        let items: IHomeRO[] = [];
        const counts: number[] = [];
        let nestedItemsCount = 0;
        const postPermission = grantPermission(
            this.rolesBuilder,
            AppResources.POST,
            'read',
            jwtUser,
            null,
        );
        const questionPermission = grantPermission(
            this.rolesBuilder,
            AppResources.QUESTION,
            'read',
            jwtUser,
            null,
        );
        const userPermission = grantPermission(
            this.rolesBuilder,
            AppResources.USER,
            'read',
            jwtUser,
            null,
        );

        if (
            !(
                userPermission.granted &&
                questionPermission.granted &&
                postPermission.granted
            )
        )
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );

        if (postPermission.granted) {
            try {
                const {
                    entities,
                    count,
                } = await this.postRepository.getAllPosts(pagOpts);
                if (entities.length > 0) {
                    const posts = postPermission.filter(entities);
                    nestedItemsCount += posts.length;
                    items.push(...posts);
                }
                counts[0] = count;
            } catch ({ detail }) {
                throw new HttpException(
                    detail || 'OOPS!',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }

        if (questionPermission.granted) {
            try {
                const {
                    entities,
                    count,
                } = await this.questionRepository.getAllQuestions(pagOpts);
                if (entities.length > 0) {
                    const questions = questionPermission.filter(entities);
                    nestedItemsCount += questions.length;
                    items.push(...questions);
                }
                counts[1] = count;
            } catch ({ detail }) {
                throw new HttpException(
                    detail || 'OOPS!',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }

        if (userPermission.granted) {
            try {
                const {
                    entities,
                    count,
                } = await this.userRepository.getAllUsers(pagOpts);
                if (entities.length > 0) {
                    const users = userPermission.filter(entities);
                    nestedItemsCount += users.length;
                    const userList = new UserListRO({ userList: users });
                    items.push(userList);
                }
                counts[2] = count;
            } catch ({ detail }) {
                throw new HttpException(
                    detail || 'OOPS!',
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        }

        items = items.sort(() => 0.5 - Math.random()); // shuffle array

        return customPaginate<IHomeRO>(
            {
                count: _.max(counts),
                entities: items,
                nestedItemsCount,
                totalNestedCount: _.sum(counts),
            },
            pagOpts,
        );
    }
}
