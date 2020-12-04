import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons';
import {
    customPaginate,
    grantPermission,
    IDeleteResultDTO,
    IPagination,
    paginateFilter,
    PaginateParams,
} from '@/shared';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateTopicDTO, ITopicRO, TopicRO, UpdateTopicDTO } from '@topic/dto';
import { TopicEntity } from '@topic/entities';
import { TopicRepository } from '@topic/repositories';
import { TrainerRepository } from '@trainer/repositories';
import { JwtUser } from '@user/dto';
import { UserRepository } from '@user/repositories';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { ClasseRepository } from '@classe/repositories';
import { ClasseRO } from '@classe/dto';

@Injectable()
export class TopicService extends BaseService<TopicEntity, TopicRepository> {
    private readonly logger: Logger = new Logger(TopicService.name);

    constructor(
        private readonly topicRepository: TopicRepository,
        private readonly userRepository: UserRepository,
        private readonly trainerRepository: TrainerRepository,
        private readonly classeRepository: ClasseRepository,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {
        super(topicRepository);
    }

    async getAllClassesByTopicId(
        pagOpts: PaginateParams,
        topicId: string,
        jwtUser: JwtUser,
    ) {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.CLASSE,
            'read',
            jwtUser,
            null,
        );
        if (permission.granted) {
            try {
                const data = await this.classeRepository.getAllClasseByTopicId(
                    topicId,
                    pagOpts,
                );
                const result = customPaginate<ClasseRO>(data, pagOpts);
                return paginateFilter(result, permission);
            } catch ({ detail }) {
                throw new HttpException(
                    detail || `OOPS! Can't get all classes by :topicId`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async getAllTopics(
        pagOpts: PaginateParams,
        jwtUser: JwtUser,
    ): Promise<IPagination<ITopicRO>> {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.TOPIC,
            'read',
            jwtUser,
            null,
        );
        if (permission.granted) {
            try {
                const data = await this.topicRepository.getAllTopics(pagOpts);
                const result = customPaginate<TopicRO>(data, pagOpts);
                return paginateFilter(result, permission);
            } catch ({ detail }) {
                throw new HttpException(
                    detail || `OOPS! Can't get all topics`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async getTopicById(id: string, jwtUser: JwtUser): Promise<ITopicRO> {
        const foundTopic = await this.topicRepository.getTopicById(id);
        if (!foundTopic)
            throw new HttpException(
                `Topic with id: ${id} not found!`,
                HttpStatus.NOT_FOUND,
            );
        else {
            const permission = grantPermission(
                this.rolesBuilder,
                AppResources.TOPIC,
                'read',
                jwtUser,
                foundTopic.author.id,
            );
            if (permission.granted) {
                return permission.filter(foundTopic);
            } else
                throw new HttpException(
                    `You don't have permission for this!`,
                    HttpStatus.FORBIDDEN,
                );
        }
    }

    async createTopic(
        data: CreateTopicDTO,
        jwtUser: JwtUser,
    ): Promise<ITopicRO> {
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.TOPIC,
            'create',
            jwtUser,
            null,
        );
        if (permission.granted) {
            const trainer = await this.trainerRepository.getTrainerByUserId(
                jwtUser.id,
            );
            if (!trainer)
                throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            data = permission.filter(data);
            const newTopic = this.topicRepository.create({
                ...data,
                author: trainer,
            });

            try {
                const _topic = await this.topicRepository.save(newTopic);
                return await this.topicRepository.getTopicById(_topic.id);
            } catch ({ detail }) {
                throw new HttpException(
                    detail || `OOPS! Can't create topic`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async updateTopicById(
        id: string,
        data: UpdateTopicDTO,
        jwtUser: JwtUser,
    ): Promise<ITopicRO> {
        const topic = await this.getTopicById(id, jwtUser);
        if (!topic)
            throw new HttpException(
                `Topic with id: ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.TOPIC,
            'update',
            jwtUser,
            topic.author.user.id,
        );
        if (permission.granted) {
            try {
                data = permission.filter(data);
                Object.assign(topic, data);
                await this.topicRepository.save(topic);
                const result = await this.topicRepository.getTopicById(id);
                return permission.filter(result);
            } catch ({ detail, message }) {
                this.logger.error(message);
                throw new HttpException(
                    detail || `OOPS! Can't update topic`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async deleteTopicById(
        id: string,
        jwtUser: JwtUser,
    ): Promise<IDeleteResultDTO> {
        const foundTopic = await this.getTopicById(id, jwtUser);
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.TOPIC,
            'delete',
            jwtUser,
            foundTopic.author.user.id,
        );
        if (permission.granted) {
            await this.topicRepository.delete(id);
            return {
                message: `Deleted topic with id: ${foundTopic.id}.`,
            };
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }
}
