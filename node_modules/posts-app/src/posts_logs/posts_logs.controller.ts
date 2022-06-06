import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import { PostsLogsService } from './posts_logs.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('posts-logs')
export class PostsLogsController {
  constructor(
    private readonly postsLogsService: PostsLogsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Get('/')
  async findAll(@Req() req: Request) {
    const user = await this.usersService.getUserFromRequest(req.user);
    return this.postsLogsService.findAll();
  }
}
