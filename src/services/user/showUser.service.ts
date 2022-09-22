import { User } from "../../entities/user.entity";
import AppDataSource from "../../data-source";

const showUserService = async (userId: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: { id: userId },
  });

  return user;
};

export default showUserService;
