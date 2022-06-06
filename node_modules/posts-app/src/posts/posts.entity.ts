/* eslint-disable prettier/prettier */
import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { PostsLogs } from 'src/posts_logs';
import User from '../users/users.entity';
import Comment from '../comments/comments.entity';
import PostLog from '../posts_logs/posts_logs.entity';

@Table
export default class Post extends Model {
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  title: string;

  @Column
  content: string;

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => PostLog)
  logs: PostLog[];
}
