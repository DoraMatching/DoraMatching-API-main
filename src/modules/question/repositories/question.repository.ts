import { EntityRepository, Repository } from 'typeorm';
import { QuestionEntity } from '@question/entity/question.entity';
import { Logger } from '@nestjs/common';
import { PaginateParams } from '@shared/pagination';

@EntityRepository(QuestionEntity)
export class QuestionRepository extends Repository<QuestionEntity> {
    private logger: Logger = new Logger(QuestionRepository.name);

    private readonly SELECT_QUESTION_SCOPE = [
        'question',
        'author.id',
        'author.name',
        'author.avatarUrl',
        'author.roles',
    ];

    async getAllQuestions({ order, limit, page }: Partial<PaginateParams>) {
        try {
            const [entities, count] = await this.createQueryBuilder('question')
              .leftJoinAndSelect('question.author', 'author')
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
              .where('question.id = :id', { id })
              .select(this.SELECT_QUESTION_SCOPE)
              .getOne();

        } catch (e) {
            console.error(e);
        }
    }
}
