import { IContactRequest, IContact } from "../../interfaces/contacts";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { Contact } from "../../entities/contact.entity";
import { EmailContact } from "../../entities/emailContact.entity";
import { PhoneContact } from "../../entities/phoneContact.entity";
import { AppError } from "../../errors/AppError";

const createContactService = async (
  { emails, phones, full_name }: IContactRequest,
  id: string
) => {
  const userRository = AppDataSource.getRepository(User);
  const user = await userRository.findOne({ where: { id } });

  const contactRepository = AppDataSource.getRepository(Contact);
  const emailRepository = AppDataSource.getRepository(EmailContact);
  const phoneRepository = AppDataSource.getRepository(PhoneContact);
  const findContact = await contactRepository.findOne({
    where: { full_name },
    relations: {
      user: true,
    },
  });
  if (!user) {
    throw new AppError("User not found");
  }
  if (findContact) {
    throw new AppError("User already exists");
  }

  const contact = contactRepository.create({
    full_name,
    emailsContact: [],
    phonesContact: [],
    user,
  });

  await contactRepository.save(contact);

  const emailSave = emailRepository.create({ email: emails[0].email, contact });

  await emailRepository.save(emailSave);

  const phoneSave = phoneRepository.create({ phone: phones[0].phone, contact });

  await phoneRepository.save(phoneSave);

  const contactComplete = contactRepository.findOne({ where: { full_name } });

  return contactComplete;
};

export default createContactService;
