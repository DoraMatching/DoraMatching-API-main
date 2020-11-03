import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons/base-service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { grantPermission } from '@shared/access-control/grant-permission';
import { customPaginate, IPagination, paginateFilter, PaginateParams } from '@shared/pagination';
import { ITagQuestionRO, TagQuestionRO } from '@tag-question/dto';
import { TagQuestionEntity } from '@tag-question/entities/tag-question.entity';
import { TagQuestionRepository } from '@tag-question/repositories/tag-question.repository';
import { JwtUser } from '@user/dto';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class TagQuestionService extends BaseService<TagQuestionEntity, TagQuestionRepository>{
    constructor(
      private readonly tagQuestionRepository: TagQuestionRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
        super(tagQuestionRepository);
    }
    async getAllTags(pagOpts: PaginateParams, jwtUser: JwtUser): Promise<IPagination<ITagQuestionRO>> {
        const permission = grantPermission(this.rolesBuilder, AppResources.TAG_QUESTION, 'read', jwtUser, null);
        if (permission.granted) {
            try {
            const data = await this.tagQuestionRepository.getAllTags(pagOpts);
                const result = customPaginate<TagQuestionRO>(data, pagOpts);
                return paginateFilter(result, permission);
            } catch ({ detail }) {
                throw new HttpException(detail || `Oops! Can't get all tags`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }
}
