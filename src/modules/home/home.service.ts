import { AppResources } from '@/app.roles';
import { IHomeRO, UserListRO } from '@home-modules/dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PostRepository } from '@post/repositories/post.repository';
import { QuestionRepository } from '@question/repositories/question.repository';
import { grantPermission } from '@shared/access-control/grant-permission';
import { customPaginate, IPagination, PaginateParams } from '@shared/pagination';
import { JwtUser } from '@user/dto';
import { UserRepository } from '@user/repositories/user.repository';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import _ from 'lodash';

@Injectable()
export class HomeService {
    constructor(
      private readonly userRepository: UserRepository,
      private readonly postRepository: PostRepository,
      private readonly questionRepository: QuestionRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
    }

    async getAll(pagOpts: PaginateParams, jwtUser: JwtUser): Promise<IPagination<IHomeRO>> {
        let items: IHomeRO[] = [];
        const counts: number[] = [];
        let nestedItemsCount = 0;
        const userPermission = grantPermission(this.rolesBuilder, AppResources.USER, 'read', jwtUser, null);
        const postPermission = grantPermission(this.rolesBuilder, AppResources.POST, 'read', jwtUser, null);
        const questionPermission = grantPermission(this.rolesBuilder, AppResources.QUESTION, 'read', jwtUser, null);

        if (!(userPermission.granted && questionPermission.granted && postPermission.granted))
            throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);

        if (postPermission.granted) {
            try {
                const { entities, count } = await this.postRepository.getAllPosts(pagOpts);
                if (entities.length > 0) {
                    const posts = postPermission.filter(entities);
                    nestedItemsCount += posts.length;
                    items.push(...posts);
                }
                counts[0] = count;
            } catch ({ detail }) {
                throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        if (questionPermission.granted) {
            try {
                const { entities, count } = await this.questionRepository.getAllQuestions(pagOpts);
                if (entities.length > 0) {
                    const questions = questionPermission.filter(entities);
                    nestedItemsCount += questions.length;
                    items.push(...questions);
                }
                counts[1] = count;
            } catch ({ detail }) {
                throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        if (userPermission.granted) {
            try {
                const { entities, count } = await this.userRepository.getAllUsers(pagOpts);
                if (entities.length > 0) {
                    const users = userPermission.filter(entities);
                    nestedItemsCount += users.length;
                    const userList = new UserListRO({ userList: users });
                    items.push(userList);
                }
                counts[2] = count;
            } catch ({ detail }) {
                throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        items = items.sort(() => 0.5 - Math.random()); // shuffle array

        return customPaginate<IHomeRO>({
            entities: items,
            count: _.max(counts),
            nestedItemsCount,
            totalNestedCount: _.sum(counts),
        }, pagOpts);
    }

}
