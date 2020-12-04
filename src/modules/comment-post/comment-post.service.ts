import { AppResources } from '@/app.roles';
import { BaseService } from '@/commons/base-service';
import { grantPermission, IDeleteResultDTO } from '@/shared';
import {
    CommentPostParam,
    CreateCommentPostDTO,
    ICommentPostRO,
    UpdateCommentPostDTO,
} from '@comment-post/dto';
import { CommentPostEntity } from '@comment-post/entities';
import { CommentPostRepository } from '@comment-post/repositories';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { IPostRO } from '@post/dto';
import { PostRepository } from '@post/repositories';
import { JwtUser } from '@user/dto';
import { UserRepository } from '@user/repositories';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { RecommenderService } from '../recommender/recommender.service';

@Injectable()
export class CommentPostService extends BaseService<
    CommentPostEntity,
    CommentPostRepository
> {
    private readonly logger: Logger = new Logger(CommentPostService.name);

    constructor(
        private readonly commentPostRepository: CommentPostRepository,
        private readonly postRepository: PostRepository,
        private readonly userRepository: UserRepository,
        private readonly recommenderService: RecommenderService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder,
    ) {
        super(commentPostRepository);
    }

    async createComment(
        id: string,
        data: CreateCommentPostDTO,
        jwtUser: JwtUser,
    ): Promise<IPostRO> {
        const [post, user] = await Promise.all([
            this.postRepository.getPostById(id),
            this.userRepository.findOne({ where: { id: jwtUser.id } }),
        ]);
        if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        if (post) {
            const newComment = this.commentPostRepository.create(data);
            newComment.author = user;
            newComment.post = post;
            try {
                await this.commentPostRepository.save(newComment);
                post.comments.push(newComment);
                await Promise.all([
                    this.postRepository.save(post),
                    this.recommenderService.liked(
                        jwtUser.id,
                        JSON.stringify({
                            itemId: post.id,
                            itemName: post.title,
                            itemType: 'post',
                        }),
                    ),
                ]);
            } catch ({ detail }) {
                throw new HttpException(
                    detail || `OOPS! Can't create new Post Comment`,
                    HttpStatus.INTERNAL_SERVER_ERROR,
                );
            }
            return this.postRepository.getPostById(post.id);
        } else
            throw new HttpException(
                `Post with id: ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
    }

    async findCommentById(id: string): Promise<CommentPostEntity> {
        const comment = await this.commentPostRepository.getCommentById(id);
        if (!comment)
            throw new HttpException(
                `Comment with id: ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        return comment;
    }

    async updateCommentById(
        { id, commentId }: CommentPostParam,
        data: UpdateCommentPostDTO,
        jwtUser: JwtUser,
    ): Promise<ICommentPostRO> {
        const [post, comment] = await Promise.all([
            this.postRepository.getPostById(id),
            this.findCommentById(commentId),
        ]);
        if (!post)
            throw new HttpException(
                `Post with id: ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.COMMENT_POST,
            'update',
            jwtUser,
            comment.author.id,
        );
        if (permission.granted) {
            comment.content = data.content;
            await this.commentPostRepository.save(comment);
            return this.findCommentById(commentId);
        } else
            throw new HttpException(
                `You don't have permission for this!`,
                HttpStatus.FORBIDDEN,
            );
    }

    async deleteCommentById(
        { id, commentId }: CommentPostParam,
        jwtUser: JwtUser,
    ): Promise<IDeleteResultDTO> {
        const [post, comment] = await Promise.all([
            this.postRepository.getPostById(id),
            this.findCommentById(commentId),
        ]);
        if (!post)
            throw new HttpException(
                `Post with id: ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        if (!comment)
            throw new HttpException(
                `Comment with id: ${commentId} not found`,
                HttpStatus.NOT_FOUND,
            );
        const permission = grantPermission(
            this.rolesBuilder,
            AppResources.COMMENT_POST,
            'delete',
            jwtUser,
            comment.author.id,
        );
        if (permission.granted) {
            await this.commentPostRepository.delete(commentId);
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
