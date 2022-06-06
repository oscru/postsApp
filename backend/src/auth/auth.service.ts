import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user && user.password) {
      const hash = await bcrypt.compare(pass, user.password);
      if (hash) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const { password, ...result } = user;
    const payload = {
      userId: user.dataValues.userId,
      email: user.dataValues.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        userId: user.dataValues.userId,
        role: user.dataValues.role,
        canCreatePosts: user.dataValues.canCreatePosts,
        canDeleteComments: user.dataValues.canDeleteComments,
        canEditPosts: user.dataValues.canEditPosts,
      },
    };
  }
}
