import { IContactRequest, IContact } from "../../interfaces/contacts";
import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { EmailContact } from "../../entities/emailContact.entity";
import { PhoneContact } from "../../entities/phoneContact.entity";
import { AppError } from "../../errors/AppError";

const createContactService = async ({
  emails,
  phones,
  full_name,
}: IContactRequest): Promise<IContact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const emailRepository = AppDataSource.getRepository(EmailContact);
  const phoneRepository = AppDataSource.getRepository(PhoneContact);
  const findContact = await contactRepository.findOne({
    where: { full_name },
  });
  if (findContact) {
    throw new AppError("User already exists");
  }

  const contact = contactRepository.create({
    full_name,
    emails: [],
    phones: [],
  });

  await contactRepository.save(contact);

  Object.keys(emails).map((email) =>
    emailRepository.create({ email, contact })
  );

  Object.keys(phones).map((phone) =>
    phoneRepository.create({ phone, contact })
  );

  const contactComplete = contactRepository.findOne({ where: { full_name } });

  return contactComplete;
};

export default createContactService;
