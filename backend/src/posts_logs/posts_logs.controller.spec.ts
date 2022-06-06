import { Test, TestingModule } from '@nestjs/testing';
import { PostsLogsController } from './posts_logs.controller';

describe('PostsLogsController', () => {
  let controller: PostsLogsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsLogsController],
    }).compile();

    controller = module.get<PostsLogsController>(PostsLogsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
