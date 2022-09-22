import { Contact } from "../../entities/contact.entity";
import { IContact } from "../../interfaces/contacts";
import AppDataSource from "../../data-source";

const showContactService = async (id: string): Promise<IContact> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: { id: id },
  });

  return contact;
};

export default showContactService;
