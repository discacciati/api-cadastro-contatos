import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { EmailUser } from "./emailUser.entity";
import { PhoneUser } from "./phoneUser.entity";

@Entity("user")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  full_name: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  isAdm: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => EmailUser, (email) => email.user)
  emails: EmailUser[];

  @OneToMany(() => PhoneUser, (phone) => phone.user)
  phones: PhoneUser[];
}

export { User };
