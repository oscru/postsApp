
import Post from './posts.entity';

export const postsProvider = [
  {
    provide: 'POSTS_REPOSITORY',
    useValue: Post,
  },
];
