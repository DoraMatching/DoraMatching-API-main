import { Injectable } from '@nestjs/common';
import { PostRepository } from '@post/repositories';
import { QuestionRepository } from '@question/repositories';
import { SearchQuery, SearchScopes } from '@search/search.query';
import { UserRepository } from '@user/repositories';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class SearchService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly postRepository: PostRepository,
        private readonly questionRepository: QuestionRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {}

    async search({ key, scope }: SearchQuery) {
        const result = {
            users: [],
            posts: [],
            questions: [],
        };

        const [users, posts, questions] = await Promise.all([
            this.userRepository.search(key),
            this.postRepository.search(key),
            this.questionRepository.search(key),
        ]);

        if (users && scope.includes(SearchScopes.USER)) result.users = users;
        if (posts && scope.includes(SearchScopes.POST)) result.posts = posts;
        if (questions && scope.includes(SearchScopes.QUESTION))
            result.questions = questions;
        return result;
    }
}
