import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { EmailContact } from "./emailContact.entity";
import { PhoneContact } from "./phoneContact.entity";
import { User } from "./user.entity";

@Entity("user")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  full_name: string;

  @OneToMany(() => EmailContact, (email) => email.contact)
  emails: EmailContact[];

  @OneToMany(() => PhoneContact, (phone) => phone.contact)
  phones: PhoneContact[];

  @ManyToOne(() => User, { eager: true })
  user: User;
}

export { Contact };
