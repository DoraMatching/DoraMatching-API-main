import { Test, TestingModule } from '@nestjs/testing';
import { CommentPostController } from './comment-post.controller';

describe('CommentPostController', () => {
  let controller: CommentPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentPostController],
    }).compile();

    controller = module.get<CommentPostController>(CommentPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
