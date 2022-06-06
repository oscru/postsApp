import PostLog from './posts_logs.entity';

export const postsLogsProvider = [
  {
    provide: 'POSTS_LOGS_REPOSITORY',
    useValue: PostLog,
  },
];
