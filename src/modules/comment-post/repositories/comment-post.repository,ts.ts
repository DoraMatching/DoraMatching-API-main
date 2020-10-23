import { CommentPostEntity } from '@/modules/comment-post/entities/comment-post.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CommentPostEntity)
export class CommentPostRepository extends Repository<CommentPostEntity> {
    private readonly SELECT_COMMENT_SCOPE = [
        'comment',
        'author.id',
        'author.avatarUrl',
        'author.name',
        'author.roles',
        'author.type',
    ];

    async getCommentById(id: string): Promise<CommentPostEntity> {
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
