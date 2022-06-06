import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //post / signup

  @UseGuards(JwtAuthGuard)
  @Get('/')
  @HttpCode(200)
  async getUsers(@Req() req: Request) {
    const user = req.user;
    if (!this.usersService.isAdmin(user)) {
      throw new Error('You are not authorized to view this page');
    }
    const users = await this.usersService.findNormalUsers();
    return { users };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return await this.usersService.findOneById(Number(id));
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  @HttpCode(200)
  async update(@Body() body, @Req() req: Request) {
    const user = await this.usersService.getUserFromRequest(req.user);
    if (!this.usersService.isAdmin(user)) {
      throw new Error('You are not authorized to update users');
    }
    const { id } = req.params;
    const { permissions } = body;

    let userPermissions;

    switch (permissions) {
      case 'canEditPosts':
        userPermissions = {
          canEditPosts: true,
          canDeleteComments: false,
          canCreatePosts: false,
        };
        break;
      case 'canCreatePosts':
        userPermissions = {
          canEditPosts: false,
          canDeleteComments: false,
          canCreatePosts: true,
        };
        break;
      case 'canDeleteComments':
        userPermissions = {
          canEditPosts: false,
          canDeleteComments: true,
          canCreatePosts: false,
        };
        break;
      default:
        throw new Error('An error occured, please try again later');
    }

    body = { ...body, ...userPermissions };

    await this.usersService.update(Number(id), body);
    return;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  @HttpCode(200)
  async createUser(@Body() body, @Req() req: Request) {
    const user = await this.usersService.getUserFromRequest(req.user);
    if (!this.usersService.isAdmin(user)) {
      throw new Error('You are not authorized to create users');
    }
    const { password, permissions } = body;

    const hashedPassword = await bcrypt.hash(password, 10);

    let userPermissions;

    switch (permissions) {
      case 'canEditPosts':
        userPermissions = {
          canEditPosts: true,
          canDeleteComments: false,
          canCreatePosts: false,
        };
        break;
      case 'canCreatePosts':
        userPermissions = {
          canEditPosts: false,
          canDeleteComments: false,
          canCreatePosts: true,
        };
        break;
      case 'canDeleteComments':
        userPermissions = {
          canEditPosts: false,
          canDeleteComments: true,
          canCreatePosts: false,
        };
        break;
      default:
        throw new Error('An error occured, please try again later');
    }

    body = { ...body, password: hashedPassword, ...userPermissions };

    const userCreated = await this.usersService.create({
      ...body,
      role: 'user',
    });
    return { userCreated };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(200)
  async deleteUser(@Param('id') id: string, @Req() req: Request) {
    const selectedUser = await this.usersService.findOneById(Number(id));
    const user = await this.usersService.getUserFromRequest(req.user);
    if (!this.usersService.isAdmin(user)) {
      throw new Error('You are not authorized to delete users');
    }
    await this.usersService.delete(selectedUser.userId);
    return;
  }
}
