import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons';
import {
    customPaginate,
    grantPermission,
    IDeleteResultDTO,
    IPagination,
    paginateFilter,
    PaginateParams
} from '@/shared';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateQuestionDTO, IQuestionRO, QuestionRO, UpdateQuestionDTO } from '@question/dto';
import { QuestionEntity } from '@question/entities';
import { QuestionRepository } from '@question/repositories';
import { TagQuestionRepository } from '@tag-question/repositories';
import { JwtUser } from '@user/dto';
import { UserRepository } from '@user/repositories';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

@Injectable()
export class QuestionService extends BaseService<QuestionEntity, QuestionRepository> {
    constructor(
      private readonly userRepository: UserRepository,
      private readonly questionRepository: QuestionRepository,
      private readonly tagQuestionRepository: TagQuestionRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
        super(questionRepository);
    }

    async getAllQuestions(pagOpts: PaginateParams, jwtUser: JwtUser): Promise<IPagination<IQuestionRO>> {
        const permission = grantPermission(this.rolesBuilder, AppResources.QUESTION, 'read', jwtUser, null);
        if (permission.granted) {
            try {
                const data = await this.questionRepository.getAllQuestions(pagOpts);
                const result = customPaginate<QuestionRO>(data, pagOpts);
                return paginateFilter<QuestionRO>(result, permission);
            } catch ({ detail }) {
                throw new HttpException(detail || 'OOPS!', HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async createQuestion({ tags, ...data }: CreateQuestionDTO, jwtUser: JwtUser): Promise<IQuestionRO> {
        const permission = grantPermission(this.rolesBuilder, AppResources.QUESTION, 'create', jwtUser, null);
        if (permission.granted) {
            data = permission.filter(data);
            const [user, _tags] = await Promise.all([
                this.userRepository.findOne({
                    where: { id: jwtUser.id },
                    select: ['id', 'name', 'username', 'email'],
                }),
                this.tagQuestionRepository.findManyAndCreateIfNotExisted(tags.map(tag => tag.name)),
            ]);
            if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
            const newQuestion = this.questionRepository.create({
                ...data,
                author: user,
                tags: _tags,
            });
            try {
                const _newQuestion = await this.questionRepository.save(newQuestion);
                return await this.questionRepository.getQuestionById(_newQuestion.id);
            } catch ({ detail }) {
                throw new HttpException(detail || `OOPS! Can't create question`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async getQuestionById(id: string, jwtUser: JwtUser): Promise<IQuestionRO> {
        const question = await this.questionRepository.getQuestionById(id);
        const permission = grantPermission(this.rolesBuilder, AppResources.QUESTION, 'read', jwtUser, question.author.id);

        if (permission.granted) {
            return permission.filter(question);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async updateQuestion(id: string, data: UpdateQuestionDTO, jwtUser: JwtUser): Promise<IQuestionRO> {
        const question = await this.questionRepository.getQuestionById(id);
        if (!question) throw new HttpException(`Question with id ${id} not found!`, HttpStatus.NOT_FOUND);
        const permission = grantPermission(this.rolesBuilder, AppResources.QUESTION, 'update', jwtUser, question.author.id);
        if (permission.granted) {
            data = permission.filter(data);
            Object.assign(question, data);
            await this.questionRepository.save(question);
            return await this.questionRepository.getQuestionById(id);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async deleteQuestion(id: string, jwtUser: JwtUser): Promise<IDeleteResultDTO> {
        const question = await this.questionRepository.getQuestionById(id);
        if (!question) throw new HttpException(`Question with id ${id} not found!`, HttpStatus.NOT_FOUND);
        const permission = grantPermission(this.rolesBuilder, AppResources.QUESTION, 'delete', jwtUser, question.author.id);
        if (permission.granted) {
            await this.questionRepository.delete(question.id);
            return {
                message: `Question with id: ${id} deleted`,
            };
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }
}
