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
        let counter = 0;
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
                    items.push(...posts);
                    counter += count;
                }
            } catch ({ detail }) {
                throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        if (questionPermission.granted) {
            try {
                const { entities, count } = await this.questionRepository.getAllQuestions(pagOpts);
                if (entities.length > 0) {
                    const questions = questionPermission.filter(entities);
                    items.push(...questions);
                    counter += count;
                }
            } catch ({ detail }) {
                throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        if (userPermission.granted) {
            try {
                const { entities, count } = await this.userRepository.getAllUsers(pagOpts);
                if (entities.length > 0) {
                    const users = userPermission.filter(entities);
                    const userList = new UserListRO({ userList: users });
                    items.push(userList);
                    counter += count;
                }
            } catch ({ detail }) {
                throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        items = items.sort(() => 0.5 - Math.random()); // shuffle array

        return customPaginate<IHomeRO>({ entities: items, count: counter }, {
            ...pagOpts,
            limit: (pagOpts.limit * 3),
        });
    }

}
