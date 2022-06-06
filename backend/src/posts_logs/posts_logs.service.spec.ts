import { Test, TestingModule } from '@nestjs/testing';
import { PostsLogsService } from './posts_logs.service';

describe('PostsLogsService', () => {
  let service: PostsLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostsLogsService],
    }).compile();

    service = module.get<PostsLogsService>(PostsLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
