import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { User } from "./user.entity";

@Entity("phonesUser")
class PhoneUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  phone: string;

  @ManyToOne((type) => User, (user) => user.phonesUser, {
    eager: true,
    onDelete: "CASCADE",
  })
  user: User;
}

export { PhoneUser };
