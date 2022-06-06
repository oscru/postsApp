import { Injectable, Inject } from '@nestjs/common';
// import { CreatePostDto } from './dto/create-post.dto';
import Post from './posts.entity';

@Injectable()
export default class PostsService {
  constructor(
    @Inject('POSTS_REPOSITORY')
    private readonly postsRepository: typeof Post,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.findAll<Post>({
      order: [['createdAt', 'DESC']],
    });
  }

  async findOne(id: string): Promise<Post> {
    return this.postsRepository.findOne<Post>({ where: { id } });
  }

  async create(body: any): Promise<Post> {
    return this.postsRepository.create(body);
  }

  async delete(id: number): Promise<any> {
    return this.postsRepository.destroy({ where: { id } });
  }

  async update(id: number, body: any): Promise<void> {
    this.postsRepository.update(body, {
      where: { id },
    });
    return;
  }
}
