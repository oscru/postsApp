import {
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { Request } from 'express';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import PostsService from './posts/posts.service';
import { UsersService } from './users/users.service';
import { CommentsService } from './comments/comments.service';
/*@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }*/
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private postsService: PostsService,
    private usersSerivce: UsersService,
    private commentsService: CommentsService,
  ) {}

  @Get('/posts')
  async root(@Req() req: Request) {
    const posts = await this.postsService.findAll();
    return { posts };
  }

  @Get('auth/login')
  @Render('login')
  loginView() {
    return { message: 'This is the login view!' };
  }

  @Get('auth/register')
  @Render('signup')
  signUpView() {
    return { message: 'This is the signup view!' };
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Get('read/:id')
  @Render('posts/read')
  async readOne(@Param('id') id: string) {
    const post = await this.postsService.findOne(id);
    const user = await this.usersSerivce.findAuthor(post.userId);
    const comments = await this.commentsService.findCommentsByPost(post.id);
    return { post, user, comments };
  }
}
