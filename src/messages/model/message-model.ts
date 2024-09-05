import { DataTypes } from "sequelize";
import {  BelongsTo, Column, ForeignKey, Model, Table, Unique } from "sequelize-typescript";
import User from "../../users/user-model";

@Table
class Message extends Model {
  @Column({
    defaultValue: DataTypes.UUIDV4,
  })
  declare dmId: string;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
  })
  declare senderId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
  })
  declare receiverId: number;

  @Column
  declare message: string;

  @Column
  declare sentTime: Date;

  @BelongsTo(() => User,"senderId")
  sender!: User;

  @BelongsTo(() => User,"receiverId")
  receiver!: User;
}

export default Message;
