import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { Contact } from "./contact.entity";

@Entity("phonesContact")
class PhoneContact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  phone: string;

  @ManyToOne((type) => Contact, (contact) => contact.phonesContact, {
    eager: true,
    onDelete: "CASCADE",
  })
  contact: Contact;
}

export { PhoneContact };
