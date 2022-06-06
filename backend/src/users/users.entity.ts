/* eslint-disable prettier/prettier */
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  DataType,
  HasMany,
} from 'sequelize-typescript';
import Post from 'src/posts/posts.entity';

@Table
export default class User extends Model {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  userId: number;

  @Column
  name: string;

  @Column
  lastname: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  role: string;

  @Column
  canCreatePosts: boolean;

  @Column
  canEditPosts: boolean;

  @Column
  canDeleteComments: boolean;

  @HasMany(() => Post)
  posts: Post[];
}
