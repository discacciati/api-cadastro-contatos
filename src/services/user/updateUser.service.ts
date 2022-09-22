import { IUserUpdate, IUser } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { EmailUser } from "../../entities/emailUser.entity";
import { PhoneUser } from "../../entities/phoneUser.entity";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";

const updateUserService = async (
  id: string,
  userDataUpdate: any
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const emailRepository = AppDataSource.getRepository(EmailUser);
  const phoneRepository = AppDataSource.getRepository(PhoneUser);
  const findUser = await userRepository.findOne({
    where: { id },
  });
  if (findUser) {
    throw new AppError("User already exists");
  }

  if (userDataUpdate.password) {
    const hashedPassword = await hash(userDataUpdate.password, 10);
  }

  const user = userRepository.update(id, {});

  await userRepository.save(user);

  await emails.map((email) => emailRepository.update({ email, user }));

  await phones.map((phone) => phoneRepository.update({ phone, user }));

  const userComplete = userRepository.findOne({ where: { full_name } });

  return userComplete;
};

export default updateUserService;
