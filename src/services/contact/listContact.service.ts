import { Contact } from "../../entities/contact.entity";
import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";

const listContactService = async (id: string): Promise<Contact[]> => {
  const userRository = AppDataSource.getRepository(User);
  const user = await userRository.findOne({ where: { id } });

  const contactRepository = AppDataSource.getRepository(Contact);

  const contacts = await contactRepository.find({
    relations: {
      user: true,
    },
  });

  return contacts;
};

export default listContactService;
