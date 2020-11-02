import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons/base-service';
import { grantPermission } from '@/shared/access-control/grant-permission';
import { customPaginate, IPagination, paginateFilter, PaginateParams } from '@/shared/pagination';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { TopicEntity } from '@topic/entities/topic.entity';
import { JwtUser } from '@user/dto';
import { UserRepository } from '@user/repositories/user.repository';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { ITopicRO, TopicRO } from './dto/response-topic.dto';
import { TopicRepository } from './repositories/topic.repository';

@Injectable()
export class TopicService extends BaseService<TopicEntity, TopicRepository>{
    private readonly logger: Logger = new Logger(TopicService.name);

    constructor(
        private readonly topicRepository: TopicRepository,
        private readonly userRepository: UserRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder
    ) {
        super(topicRepository);
    }

    async getAllTopics(pagOpts: PaginateParams, jwtUser: JwtUser): Promise<IPagination<ITopicRO>> {
        const permission = grantPermission(this.rolesBuilder, AppResources.TOPIC, 'read', jwtUser, null);
        if (permission.granted) {
            try {
                const data = await this.topicRepository.getAllTopics(pagOpts);
                const result = customPaginate<TopicRO>(data, pagOpts);
                return paginateFilter(result, permission);
            } catch ({ detail }) {
                throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async getTopicById(id: string, jwtUser: JwtUser): Promise<ITopicRO> {
        const foundTopic = await this.topicRepository.getTopicById(id);
        if (!foundTopic) throw new HttpException(`Topic with id: ${id} not found!`, HttpStatus.NOT_FOUND);
        else {
            const permission = grantPermission(this.rolesBuilder, AppResources.TOPIC, 'read', jwtUser, foundTopic.author.id);
            if (permission.granted) {
                return permission.filter(foundTopic);
            } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
        }
    }
}
