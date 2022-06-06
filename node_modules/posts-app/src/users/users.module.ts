import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { usersProvider } from './users.providers';

interface AuthUser {
  name: string;
  email: string;
}

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProvider],
  exports: [UsersService],
})
export class UsersModule {
  /* async requestCurrent(request: Request) {
    const authUser = request.user as AuthUser;

    if (!request.user) {
      throw new Error('No auth user in request');
    }

    const { sub, name, email } = authUser;
    const user = await this.findOne({ id: sub });

    if (user) {
      return user;
    }

    return await this.create({ id: sub, name, email });
  } */
}
