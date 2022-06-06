import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { CommentsService } from 'src/comments/comments.service';
import { PostsLogsService } from 'src/posts_logs/posts_logs.service';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import PostsService from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly usersService: UsersService,
    private readonly commentsService: CommentsService,
    private readonly postsLogsService: PostsLogsService,
  ) {}

  @Get('/:id')
  @HttpCode(200)
  async getPost(@Param() param: any) {
    const post = await this.postsService.findOne(param.id);
    const comments = await this.commentsService.findCommentsByPostId(param.id);
    const users = await this.usersService.findAll();
    const author = users.find((user) => user.userId === post.userId);

    const commentsWAuthor = [];

    for (const comment of comments) {
      const author = users.find((user) => user.userId === comment.userId);
      commentsWAuthor.push({ ...comment, author });
    }

    return { post, commentsWAuthor, author };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @HttpCode(200)
  async createPost(@Req() req: Request, @Body() body: any) {
    const user = await this.usersService.getUserFromRequest(req.user);
    if (!this.usersService.isAdmin(user) || !user.canCreatePosts) {
      throw new ForbiddenException('Only register users can create posts');
    }
    body = {
      ...body,
      userId: user.userId,
    };
    try {
      await this.postsService.create(body);
    } catch (e) {
      return { error: e.message };
    }
    return { message: 'Post created' };
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @HttpCode(200)
  async updatePost(
    @Param() param: any,
    @Body() body: any,
    @Req() req: Request,
  ) {
    const user = await this.usersService.getUserFromRequest(req.user);
    const post = await this.postsService.findOne(param.id);

    const postLogBody = {
      userId: user.userId,
      postId: post.id,
      action: 'DELETE',
    };

    await this.postsLogsService.createRegister({ ...postLogBody });
    await this.postsService.update(post.id, body);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(200)
  async deletePost(@Param() param: any, @Req() req: Request) {
    const post = await this.postsService.findOne(param.id);
    const user = await this.usersService.getUserFromRequest(req.user);

    if (!this.usersService.isAdmin(user) || !user.canCreatePosts) {
      throw new ForbiddenException('Only admins can delete posts');
    }

    const postLogBody = {
      userId: user.userId,
      postId: post.id,
      action: 'DELETE',
    };

    await this.postsLogsService.createRegister({ ...postLogBody });
    await this.postsService.delete(post.id);
    return;
  }
}
