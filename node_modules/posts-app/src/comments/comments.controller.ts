import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(200)
  @Post()
  async create(@Req() req: Request, @Body() body: any) {
    const userId = body.userId;
    let user;
    if (userId) {
      user = await this.usersService.findOne(userId);
    }
    if (user) {
      body = {
        ...body,
        userId: user.userId,
      };
    }
    return await this.commentsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Delete(':id')
  async delete(@Req() req: Request, @Param() param: any) {
    console.log(param.id);
    const user = await this.usersService.getUserFromRequest(req.user);
    if (!user || !user.canDeleteComments) {
      throw new Error('You are not authorized to delete this comment');
    }
    return await this.commentsService.delete(param.id);
  }
}
