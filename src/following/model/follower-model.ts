import { DataTypes } from "sequelize";
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import User from "../../users/user-model";


@Table
class Followers extends Model {
  @PrimaryKey
  @Column({ type: DataTypes.UUID, allowNull: false })
  followId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  userId!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataTypes.INTEGER,
    allowNull: false,
  })
  followerUserId!:number

  @Column
  declare followTime: Date;

  @BelongsTo(() => User, "userId")
  declare user: User;

  @BelongsTo(() => User, "followerUserId")
  declare follower: User;

}

export default Followers;
