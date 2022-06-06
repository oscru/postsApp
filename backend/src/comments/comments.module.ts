import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { commentsProvider } from './comments.providers';
import { DatabaseModule } from '../database/database.module';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import Comment from './comments.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [CommentsController],
  providers: [CommentsService, ...commentsProvider],
  exports: [CommentsService],
})
export class CommentsModule {}
