import { CommentQuestionEntity } from '@/modules/comment-question/entities/comment-question.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CommentQuestionEntity)
export class CommentQuestionRepository extends Repository<CommentQuestionEntity> {
    private readonly SELECT_COMMENT_SCOPE = [
        'comment',
        'author.id',
        'author.name',
        'author.avatarUrl',
        'author.roles',
        'author.type'
    ];

    async getCommentById(id: string): Promise<CommentQuestionEntity> {
        try {
            return await this.createQueryBuilder('comment')
              .leftJoinAndSelect('comment.author', 'author')
              .where('comment.id = :id', { id })
              .select(this.SELECT_COMMENT_SCOPE)
              .getOne();
        } catch (e) {
            console.error(e);
        }
    }
}
