import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { EmailUser } from "./emailUser.entity";
import { PhoneUser } from "./phoneUser.entity";
import { Contact } from "./contact.entity";

@Entity("user")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  full_name: string;

  @Column({ nullable: true })
  @Exclude()
  password: string;

  @Column()
  isAdm: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany((type) => EmailUser, (emailUser) => emailUser.user, {
    cascade: true,
  })
  emailsUser: EmailUser[];

  @OneToMany((type) => PhoneUser, (phoneUser) => phoneUser.user, {
    cascade: true,
  })
  phonesUser: PhoneUser[];

  @OneToMany((type) => Contact, (contact) => contact.user, {
    cascade: true,
  })
  contacts: Contact[];
}

export { User };
