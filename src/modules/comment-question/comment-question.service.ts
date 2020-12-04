import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons/base-service';
import { grantPermission, IDeleteResultDTO } from '@/shared';
import {
    CommentQuestionParam,
    CreateCommentQuestionDTO,
    ICommentQuestionRO,
    UpdateCommentQuestionDTO,
} from '@comment-question/dto';
import { CommentQuestionEntity } from '@comment-question/entities';
import { CommentQuestionRepository } from '@comment-question/repositories';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IQuestionRO } from '@question/dto';
import { QuestionRepository } from '@question/repositories';
import { JwtUser } from '@user/dto';
import { UserRepository } from '@user/repositories';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { RecommenderService } from '../recommender/recommender.service';

@Injectable()
export class CommentQuestionService extends BaseService<
    CommentQuestionEntity,
    CommentQuestionRepository
> {
    constructor(
        private readonly commentQuestionRepository: CommentQuestionRepository,
        private readonly questionRepository: QuestionRepository,
        private readonly userRepository: UserRepository,
        private readonly recommenderService: RecommenderService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {
        super(commentQuestionRepository);
    }

    async createComment(
        id: string,
        data: CreateCommentQuestionDTO,
        jwtUser: JwtUser,
    ): Promise<IQuestionRO> {
        const [question, user] = await Promise.all([
            this.questionRepository.getQuestionById(id),
            this.userRepository.findOne({ where: { id: jwtUser.id } }),
        ]);
        if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        if (question) {
            const newComment = this.commentQuestionRepository.create(data);
            newComment.author = user;
            newComment.question = question;
            try {
                await this.commentQuestionRepository.save(newComment);
                question.comments.push(newComment);
                await Promise.all([
                    this.questionRepository.save(question),
                    this.recommenderService.liked(
                        jwtUser.id,
                        JSON.stringify({
                            itemId: question.id,
                            itemName: question.type,
                            itemType: 'question',
                        }),
                    ),
                ]);
            } catch ({ detail }) {
                throw new HttpException(
                    detail || `OOPS! Can't create new Question Comment`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
            return this.questionRepository.getQuestionById(question.id);
        } else
            throw new HttpException(
                `Question with id: ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
    }

    async findCommentById(id: string): Promise<CommentQuestionEntity> {
        const comment = await this.commentQuestionRepository.getCommentById(id);
        if (!comment)
            throw new HttpException(
                `Comment with id: ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        return comment;
    }

    async updateCommentById(
        { id, commentId }: CommentQuestionParam,
        data: UpdateCommentQuestionDTO,
        jwtUser: JwtUser,
    ): Promise<ICommentQuestionRO> {
        const [question, comment] = await Promise.all([
            this.questionRepository.getQuestionById(id),
            this.findCommentById(commentId),
        ]);
        if (!question)
            throw new HttpException(
                `Question with id: ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.COMMENT_QUESTION,
            'update',
            jwtUser,
            comment.author.id,
        );
        if (permission.granted) {
            comment.content = data.content;
            await this.commentQuestionRepository.save(comment);
            return this.findCommentById(commentId);
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async deleteCommentById(
        { id, commentId }: CommentQuestionParam,
        jwtUser: JwtUser,
    ): Promise<IDeleteResultDTO> {
        const [question, comment] = await Promise.all([
            this.questionRepository.getQuestionById(id),
            this.findCommentById(commentId),
        ]);
        if (!question)
            throw new HttpException(
                `Question with id: ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        if (!comment)
            throw new HttpException(
                `Comment with id: ${commentId} not found`,
                HttpStatus.NOT_FOUND,
            );
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.COMMENT_QUESTION,
            'delete',
            jwtUser,
            comment.author.id,
        );
        if (permission.granted) {
            await this.commentQuestionRepository.delete(commentId);
            return {
                message: `Deleted comment with id: ${commentId}.`,
            };
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }
}
