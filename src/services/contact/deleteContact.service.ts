import AppDataSource from "../../data-source";
import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deleteContactService = async (
  id: string,
  userId: string
): Promise<void> => {
  const userRository = AppDataSource.getRepository(User);
  const user = await userRository.findOne({ where: { id: userId } });

  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: { id: id },
    relations: {
      user: true,
    },
  });

  if (!contact) {
    throw new AppError("Contact not found", 404);
  }

  await contactRepository.delete(contact);
};

export default deleteContactService;
