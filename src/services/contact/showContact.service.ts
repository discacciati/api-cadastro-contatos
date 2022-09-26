import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import { IContact } from "../../interfaces/contacts";
import AppDataSource from "../../data-source";

const showContactService = async (id: string, userId: string) => {
  const userRository = AppDataSource.getRepository(User);
  const user = await userRository.findOne({ where: { id: userId } });

  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: { id: id },
    relations: {
      user: true,
    },
  });

  return contact;
};

export default showContactService;
