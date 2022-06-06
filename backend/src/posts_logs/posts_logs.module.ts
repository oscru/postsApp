import { Module } from '@nestjs/common';
import { PostsLogsService } from './posts_logs.service';
import { postsLogsProvider } from './posts_logs.providers';
import { DatabaseModule } from '../database/database.module';
import { PostsLogsController } from './posts_logs.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import PostLog from './posts_logs.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [PostsLogsController],
  providers: [PostsLogsService, ...postsLogsProvider],
  exports: [PostsLogsService],
})
export class PostsLogsModule {}
