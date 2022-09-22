import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { AppError } from "../../errors/AppError";

const deleteContactService = async (id: string): Promise<void> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOneBy({ id: id });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  await contactRepository.delete(contact);
};

export default deleteContactService;
