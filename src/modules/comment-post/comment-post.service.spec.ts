import { Test, TestingModule } from '@nestjs/testing';
import { CommentPostService } from './comment-post.service';

describe('CommentPostService', () => {
  let service: CommentPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentPostService],
    }).compile();

    service = module.get<CommentPostService>(CommentPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
