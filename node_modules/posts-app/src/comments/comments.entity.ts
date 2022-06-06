/* eslint-disable prettier/prettier */
import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import User from 'src/users/users.entity';
import Post from 'src/posts/posts.entity';

@Table
export default class Comment extends Model {
  @Column
  comment: string;

  @Column
  commentId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  postId: number;

  @BelongsTo(() => Post)
  post: Post;
}
