import { Test, TestingModule } from '@nestjs/testing';
import { PostsLogs } from './posts_logs';

describe('PostsLogs', () => {
  let provider: PostsLogs;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsLogs],
    }).compile();

    provider = module.get<PostsLogs>(PostsLogs);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
