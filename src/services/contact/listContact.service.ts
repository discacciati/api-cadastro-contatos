import { Contact } from "../../entities/contact.entity";
import AppDataSource from "../../data-source";

const listContactService = async (): Promise<Contact[]> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contacts = await contactRepository.find();

  return contacts;
};

export default listContactService;
