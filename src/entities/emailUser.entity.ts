import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { User } from "./user.entity";

@Entity("emailsUser")
class EmailUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @ManyToOne((type) => User, (user) => user.emailsUser, {
    eager: true,
    onDelete: "CASCADE",
  })
  user: User;
}

export { EmailUser };
