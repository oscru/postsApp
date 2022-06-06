
import Comment from './comments.entity';

export const commentsProvider = [
  {
    provide: 'COMMENTS_REPOSITORY',
    useValue: Comment,
  },
];
