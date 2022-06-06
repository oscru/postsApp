import { Injectable, Inject } from '@nestjs/common';
import PostLog from './posts_logs.entity';

@Injectable()
export class PostsLogsService {
  constructor(
    @Inject('POSTS_LOGS_REPOSITORY')
    private readonly postsLogsRepository: typeof PostLog,
  ) {}

  async findAll(): Promise<PostLog[]> {
    return this.postsLogsRepository.findAll<PostLog>({
      order: [['createdAt', 'DESC']],
    });
  }

  async createRegister(body: any): Promise<PostLog> {
    return this.postsLogsRepository.create(body);
  }
}
