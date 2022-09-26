import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { Contact } from "./contact.entity";

@Entity("emailsContact")
class EmailContact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @ManyToOne((type) => Contact, (contact) => contact.emailsContact, {
    eager: true,
    onDelete: "CASCADE",
  })
  contact: Contact;
}

export { EmailContact };
