import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Unique,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { EmailContact } from "./emailContact.entity";
import { PhoneContact } from "./phoneContact.entity";
import { User } from "./user.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  full_name: string;

  @OneToMany((type) => EmailContact, (emailContact) => emailContact.contact, {
    cascade: true,
  })
  emailsContact: EmailContact[];

  @OneToMany((type) => PhoneContact, (phoneContact) => phoneContact.contact, {
    cascade: true,
  })
  phonesContact: PhoneContact[];

  @ManyToOne(() => User, { eager: true, onDelete: "CASCADE" })
  user: User;
}

export { Contact };
