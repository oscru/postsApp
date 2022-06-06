import { Module } from '@nestjs/common';
import PostsService from './posts.service';
import { postsProvider } from './posts.providers';
import { DatabaseModule } from '../database/database.module';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsModule } from 'src/comments/comments.module';
import { UsersModule } from 'src/users/users.module';
import { PostsLogsModule } from 'src/posts_logs/posts_logs.module';
import Post from './posts.entity';

@Module({
  imports: [DatabaseModule, UsersModule, CommentsModule, PostsLogsModule],
  controllers: [PostsController],
  providers: [PostsService, ...postsProvider],
  exports: [PostsService],
})
export class PostsModule {}
