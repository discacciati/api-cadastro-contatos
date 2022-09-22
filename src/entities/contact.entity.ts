import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { EmailContact } from "./emailContact.entity";
import { PhoneContact } from "./phoneContact.entity";

@Entity("user")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  full_name: string;

  @OneToMany(() => EmailContact, (email) => email.user)
  emails: EmailContact[];

  @OneToMany(() => PhoneContact, (phone) => phone.user)
  phones: PhoneContact[];
}

export { Contact };
