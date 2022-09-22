import { User } from "../../entities/user.entity";
import { IUser } from "../../interfaces/users";
import AppDataSource from "../../data-source";

const showUserService = async (id: string): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: id },
  });

  return user;
};

export default showUserService;
