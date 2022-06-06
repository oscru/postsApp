import { Inject, Injectable } from '@nestjs/common';
import Comment from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('COMMENTS_REPOSITORY')
    private readonly commentsRepository: typeof Comment,
  ) {}

  async findCommentsByPost(postId: string): Promise<Comment[]> {
    return this.commentsRepository.findAll<Comment>({
      where: { postId },
      order: [['createdAt', 'ASC']],
    });
  }

  async create(body: any) {
    return this.commentsRepository.create(body);
  }

  async findCommentsByPostId(postId: string): Promise<Comment[]> {
    return this.commentsRepository.findAll<Comment>({
      where: { postId },
      order: [['createdAt', 'DESC']],
    });
  }

  async delete(id: string) {
    return this.commentsRepository.destroy({
      where: { id },
    });
  }
}
