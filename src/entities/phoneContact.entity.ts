import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { Contact } from "./contact.entity";

@Entity("phoneContact")
class PhoneContact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  phone: string;

  @ManyToOne(() => Contact, { eager: true })
  contact: Contact;
}

export { PhoneContact };
