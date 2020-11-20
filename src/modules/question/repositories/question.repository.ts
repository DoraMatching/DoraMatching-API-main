import { PaginateParams } from '@/shared';
import { Logger } from '@nestjs/common';
import { QuestionEntity } from '@question/entities';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(QuestionEntity)
export class QuestionRepository extends Repository<QuestionEntity> {
    private logger: Logger = new Logger(QuestionRepository.name);

    private readonly SELECT_QUESTION_SCOPE = [
        'question',
        'author.id',
        'author.avatarUrl',
        'author.name',
        'author.roles',
        'author.type',
        'tag.id',
        'tag.name',
        'tag.type',
        'comments',
        'commentAuthor.id',
        'commentAuthor.avatarUrl',
        'commentAuthor.name',
        'commentAuthor.roles',
        'commentAuthor.type',
    ];

    async getAllQuestions({ order, limit, page }: Partial<PaginateParams>) {
        try {
            const [entities, count] = await this.createQueryBuilder('question')
              .leftJoinAndSelect('question.author', 'author')
              .leftJoinAndSelect('question.comments', 'comments')
              .leftJoinAndSelect('question.tags', 'tag')
              .leftJoinAndSelect('comments.author', 'commentAuthor')
              .select(this.SELECT_QUESTION_SCOPE)
              .orderBy('question.createdAt', order)
              .skip(limit * (page - 1))
              .take(limit)
              .getManyAndCount();
            return { entities, count };
        } catch (e) {
            console.error(e);
        }
    }

    async getQuestionById(id: string): Promise<QuestionEntity> {
        try {
            return await this.createQueryBuilder('question')
              .leftJoinAndSelect('question.author', 'author')
              .leftJoinAndSelect('question.comments', 'comments')
              .leftJoinAndSelect('question.tags', 'tag')
              .leftJoinAndSelect('comments.author', 'commentAuthor')
              .where('question.id = :id', { id })
              .select(this.SELECT_QUESTION_SCOPE)
              .getOne();

        } catch (e) {
            console.error(e);
        }
    }
}
