import { Inject, Injectable } from '@nestjs/common';
import User from './users.entity';
// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private readonly UsersRepository: typeof User,
  ) {}

  async getUserFromRequest(user): Promise<User> {
    return this.UsersRepository.findOne<User>({
      where: {
        userId: user.userId,
        email: user.email,
      },
    });
  }

  async create(body): Promise<User> {
    return this.UsersRepository.create<User>(body);
  }

  async findOne(user: any): Promise<User> {
    return this.UsersRepository.findOne<User>({
      where: {
        email: user,
      },
    });
  }

  async findOneById(id: number): Promise<User> {
    return this.UsersRepository.findOne<User>({
      where: {
        userId: id,
      },
    });
  }

  async findAuthor(id: number): Promise<User> {
    return this.UsersRepository.findOne<User>({
      where: {
        id: id,
      },
    });
  }

  async insertUser(username: string, password: string): Promise<User> {
    return this.UsersRepository.create<User>({
      username,
      password,
    });
  }

  async findAll(): Promise<User[]> {
    return this.UsersRepository.findAll<User>({
      order: [['createdAt', 'DESC']],
    });
  }

  async findNormalUsers(): Promise<User[]> {
    return this.UsersRepository.findAll<User>({
      where: {
        role: 'user',
      },
      order: [['createdAt', 'DESC']],
    });
  }

  async isAdmin(user): Promise<User> {
    return this.UsersRepository.findOne<User>({
      where: {
        userId: user.userId,
        email: user.email,
        role: 'admin',
      },
      order: [['createdAt', 'DESC']],
    });
  }

  async update(id: number, body): Promise<void> {
    console.log('aqui');
    this.UsersRepository.update<User>(body, {
      where: {
        userId: id,
      },
    });
    return;
  }

  async delete(id: number): Promise<void> {
    this.UsersRepository.destroy({
      where: {
        userId: id,
      },
    });
    return;
  }
}
