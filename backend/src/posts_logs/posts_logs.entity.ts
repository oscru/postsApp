/* eslint-disable prettier/prettier */
import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
  } from 'sequelize-typescript';
  import User from 'src/users/users.entity';
  import Post from 'src/posts/posts.entity';
  
  @Table
  export default class PostLog extends Model {
    @Column
    action: string;
  
    @ForeignKey(() => User)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    userId: number;
  
    Post: number;
    @ForeignKey(() => Post)
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
    })
    postId: number;
  }
  