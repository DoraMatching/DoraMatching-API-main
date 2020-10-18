import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons/base-service';
import {
    CommentPostParam,
    CreateCommentPostDTO,
    ICommentPostRO,
    UpdateCommentPostDTO
} from '@comment-post/dto';
import { CommentPostEntity } from '@comment-post/entity/comment-post.entity';
import { CommentPostRepository } from '@comment-post/repositories/comment-post.repository,ts';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IPostRO } from '@post/dto';
import { PostRepository } from '@post/repositories/post.repository';
import { grantPermission } from '@shared/access-control/grant-permission';
import { IDeleteResultDTO } from '@shared/dto/';
import { JwtUser } from '@user/dto';
import { UserRepository } from '@user/repositories/user.repository';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';

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

    async createComment(id: string, data: CreateCommentPostDTO, jwtUser: JwtUser): Promise<IPostRO> {
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

    async updateCommentById({ id, commentId }: CommentPostParam, data: UpdateCommentPostDTO, jwtUser: JwtUser): Promise<ICommentPostRO> {
        const [post, comment] = await Promise.all([this.postRepository.getPostById(id), this.findCommentById(commentId)]);
        if (!post) throw new HttpException(`Post with id: ${id} not found`, HttpStatus.NOT_FOUND);
        const permission = grantPermission(this.rolesBuilder, AppResources.COMMENT_POST, 'update', jwtUser, comment.author.id);
        if (permission.granted) {
            comment.content = data.content;
            await this.commentPostRepository.save(comment);
            return this.findCommentById(commentId);
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }

    async deleteCommentById({ id, commentId }: CommentPostParam, jwtUser: JwtUser): Promise<IDeleteResultDTO> {
        const [post, comment] = await Promise.all([this.postRepository.getPostById(id), this.findCommentById(commentId)]);
        if (!post) throw new HttpException(`Post with id: ${id} not found`, HttpStatus.NOT_FOUND);
        if (!comment) throw new HttpException(`Comment with id: ${commentId} not found`, HttpStatus.NOT_FOUND);
        const permission = grantPermission(this.rolesBuilder, AppResources.COMMENT_POST, 'delete', jwtUser, comment.author.id);
        if (permission.granted) {
            await this.commentPostRepository.delete(commentId);
            return {
                message: `Deleted comment with id: ${commentId}.`,
            };
        } else throw new HttpException(`You don't have permission for this!`, HttpStatus.FORBIDDEN);
    }
}
