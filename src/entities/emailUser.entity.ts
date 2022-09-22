import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { User } from "./user.entity";

@Entity("emailUser")
@Unique(["email"])
class EmailUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => User, { eager: true })
  user: User;
}

export { EmailUser };
