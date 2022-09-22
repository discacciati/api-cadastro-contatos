import { IContactUpdate, IContact } from "../../interfaces/contacts";
import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { EmailContact } from "../../entities/emailContact.entity";
import { PhoneContact } from "../../entities/phoneContact.entity";
import { AppError } from "../../errors/AppError";

const updateContactService = async ({
  id,
  full_name,
  emails,
  phones,
}: IContactUpdate): Promise<IContact> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const emailRepository = AppDataSource.getRepository(EmailContact);
  const phoneRepository = AppDataSource.getRepository(PhoneContact);
  const findUser = await contactRepository.findOne({
    where: { full_name },
  });
  if (findUser) {
    throw new AppError("User already exists");
  }

  const contact = contactRepository.update(id, { ...AppDataSource });

  await contactRepository.save();

  Object.keys(emails).map((email) =>
    emailRepository.update({ email, contact })
  );

  Object.keys(phones).map((phone) =>
    phoneRepository.uodate({ phone, contact })
  );

  const contactComplete = contactRepository.findOne({ where: { full_name } });

  return contactComplete;
};

export default updateContactService;
