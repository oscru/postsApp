import { Sequelize } from 'sequelize-typescript';
import Comment from 'src/comments/comments.entity';
import Post from '../posts/posts.entity';
import User from '../users/users.entity';
import PostLog from 'src/posts_logs/posts_logs.entity';

export const DatabaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'nest',
      });
      sequelize.addModels([Post, Comment, User, PostLog]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
