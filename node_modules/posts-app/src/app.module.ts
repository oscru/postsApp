import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PostsModule } from './posts/posts.module';
import { DatabaseProviders } from './database/database.providers';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsController } from './posts/posts.controller';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { CommentsModule } from './comments/comments.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { PostsLogsService } from './posts_logs/posts_logs.service';
import { PostsLogsController } from './posts_logs/posts_logs.controller';
import { PostsLogsModule } from './posts_logs/posts_logs.module';
import { PostsLogs } from './posts_logs';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    PostsModule,
    CommentsModule,
    AuthModule,
    UsersModule,
    PostsLogsModule,
  ],
  controllers: [
    AppController,
    PostsController,
    CommentsController,
    UsersController,
    PostsLogsController,
  ],
  providers: [AppService],
  // exports: [...DatabaseProviders],
})
export class AppModule {}
