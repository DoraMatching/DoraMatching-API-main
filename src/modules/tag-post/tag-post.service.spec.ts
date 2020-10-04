import { Test, TestingModule } from '@nestjs/testing';
import { TagPostService } from './tag-post.service';

describe('TagPostService', () => {
  let service: TagPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagPostService],
    }).compile();

    service = module.get<TagPostService>(TagPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
