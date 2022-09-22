import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { User } from "./user.entity";

@Entity("phoneUser")
class PhoneUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  phone: string;

  @ManyToOne(() => User, { eager: true })
  user: User;
}

export { PhoneUser };
