import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CommentPostEntity } from '@comment-post/entity/comment-post.entity';
import { CommentPostRepository } from '@comment-post/repositories/comment-post.repository,ts';
import { BaseService } from '@/commons/base-service';
import { CommentPostParams, CreateCommentPostDTO, UpdateCommentPostDTO } from '@comment-post/dto';
import { PostRepository } from '@post/repositories/post.repository';
import { UserRepository } from '@user/repositories/user.repository';
import { JwtUser } from '@user/dto';
import { PostRO } from '@post/dto';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { grantPermission } from '@shared/access-control/grant-permission';
import { AppResources } from '@/app.roles';

@Injectable()
export class CommentPostService extends BaseService<CommentPostEntity, CommentPostRepository> {
    private readonly logger: Logger = new Logger(CommentPostService.name);

    constructor(
      private readonly postRepository: PostRepository,
      private readonly commentPostRepository: CommentPostRepository,
      private readonly userRepository: UserRepository,
      @InjectRolesBuilder()
      private readonly rolesBuilder: RolesBuilder,
    ) {
        super(commentPostRepository);
    }

    async createComment(id: string, data: CreateCommentPostDTO, jwtUser: JwtUser): Promise<PostRO> {
        const [post, user] = await Promise.all([this.postRepository.getPostById(id), this.userRepository.findOne({ where: { id: jwtUser.id } })]);
        if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        if (post) {
            const newComment = this.commentPostRepository.create(data);
            newComment.author = user;
            newComment.post = post;
            try {
                await this.commentPostRepository.save(newComment);
                post.comments.push(newComment);
                await this.postRepository.save(post);
            } catch ({ detail }) {
                throw new HttpException(detail || `OOPS! Can't create new Post Comment`, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            return this.postRepository.getPostById(post.id);
        } else throw new HttpException(`Post with id: ${id} not found`, HttpStatus.NOT_FOUND);
    }

    async findCommentById(id: string): Promise<CommentPostEntity> {
        const comment = await this.commentPostRepository.getCommentById(id);
        if (!comment) throw new HttpException(`Comment with id: ${id} not found`, HttpStatus.NOT_FOUND);
        return comment;
    }

    async updateComment({ id, commentId }: CommentPostParams, data: UpdateCommentPostDTO, jwtUser: JwtUser) {
        const [post, comment] = await Promise.all([this.postRepository.getPostById(id), this.findCommentById(commentId)]);
        if (!post) throw new HttpException(`Post with id: ${id} not found`, HttpStatus.NOT_FOUND);
        const permission = grantPermission(this.rolesBuilder, AppResources.COMMENT_POST, 'update', jwtUser, comment.author.id);
        if (permission.granted) {
            comment.content = data.content;
            await this.commentPostRepository.save(comment);
            return this.findCommentById(commentId);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }
}
