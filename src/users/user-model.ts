import {
  BeforeSave,
  Column,
  HasMany,
  IsEmail,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import Message from "../messages/model/message-model";

@Table
class User extends Model {
  @Unique
  @Column
  declare userName: string;

  @Unique
  @IsEmail
  @Column
  declare email: string;

  @Column
  declare password: string;

  @Column
  declare bio: string;

  @Column
  declare profilePicture: string;

  @BeforeSave
  static async formatEmail(user: User) {
    if (user.email) {
      user.email = user.email.toLowerCase();
    }
  }

  @HasMany(() => Message, "senderId")
  sentMessages!: Message[];

  @HasMany(() => Message, "receiverId")
  receivedMessages!: Message[];
}

export default User;
