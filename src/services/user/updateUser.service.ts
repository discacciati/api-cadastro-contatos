import { IUserUpdate, IUser } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { EmailUser } from "../../entities/emailUser.entity";
import { PhoneUser } from "../../entities/phoneUser.entity";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";

const updateUserService = async (id: string, userDataUpdate: any) => {
  const userRepository = AppDataSource.getRepository(User);
  const emailRepository = AppDataSource.getRepository(EmailUser);
  const phoneRepository = AppDataSource.getRepository(PhoneUser);
  const findUser = await userRepository.findOne({
    where: { id },
  });
  if (!findUser) {
    throw new AppError("User not found", 401);
  }

  if (userDataUpdate.emails) {
    Object.keys(userDataUpdate.emails).map((email) =>
      emailRepository.update(id, { email })
    );
  }

  if (userDataUpdate.phones) {
    Object.keys(userDataUpdate.phones).map((phone) =>
      phoneRepository.update(id, { phone })
    );
  }

  if (userDataUpdate.password) {
    const hashedPassword = await hash(userDataUpdate.password, 10);
    userDataUpdate.password = hashedPassword;
    await userRepository.update(id, { ...userDataUpdate.password });
  }

  if (userDataUpdate.full_name) {
    await userRepository.update(id, { ...userDataUpdate.full_name });
  }

  const userComplete = userRepository.findOne({ where: { id } });

  return userComplete;
};

export default updateUserService;
