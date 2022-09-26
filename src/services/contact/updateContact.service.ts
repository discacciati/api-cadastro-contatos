import { IContactUpdate, IContact } from "../../interfaces/contacts";
import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { EmailContact } from "../../entities/emailContact.entity";
import { PhoneContact } from "../../entities/phoneContact.entity";
import { AppError } from "../../errors/AppError";

const updateContactService = async (
  id: string,
  contactDataUpdate: any,
  userId: string
) => {
  const userRository = AppDataSource.getRepository(User);
  const user = await userRository.findOne({ where: { id: userId } });

  const contactRepository = AppDataSource.getRepository(Contact);
  const emailRepository = AppDataSource.getRepository(EmailContact);
  const phoneRepository = AppDataSource.getRepository(PhoneContact);
  const findContact = await contactRepository.findOne({
    where: { id },
    relations: {
      user: true,
    },
  });
  if (!findContact) {
    throw new AppError("User not found", 401);
  }

  if (contactDataUpdate.emails) {
    Object.keys(contactDataUpdate.emails).map((email) =>
      emailRepository.update(id, { email })
    );
  }

  if (contactDataUpdate.phones) {
    Object.keys(contactDataUpdate.phones).map((phone) =>
      phoneRepository.update(id, { phone })
    );
  }

  if (contactDataUpdate.full_name) {
    await contactRepository.update(id, { ...contactDataUpdate.full_name });
  }

  const contactComplete = contactRepository.findOne({ where: { id } });

  return contactComplete;
};

export default updateContactService;
