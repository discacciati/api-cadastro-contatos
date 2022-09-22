import { Contact } from "../../entities/contact.entity";
import AppDataSource from "../../data-source";

const showContactService = async (contactId: string): Promise<Contact> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: { id: contactId },
  });

  return contact;
};

export default showContactService;
