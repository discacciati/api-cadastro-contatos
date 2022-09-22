import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
} from "typeorm";
import { Contact } from "./contact.entity";

@Entity("emailContact")
@Unique(["email"])
class EmailContact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @ManyToOne(() => Contact, { eager: true })
  contact: Contact;
}

export { EmailContact };
