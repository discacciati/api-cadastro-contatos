import { IUserRequest, IUser } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { EmailUser } from "../../entities/emailUser.entity";
import { PhoneUser } from "../../entities/phoneUser.entity";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";

const createUserService = async ({
  isAdm,
  emails,
  phones,
  password,
  full_name,
}: IUserRequest) => {
  const userRepository = AppDataSource.getRepository(User);
  const emailRepository = AppDataSource.getRepository(EmailUser);
  const phoneRepository = AppDataSource.getRepository(PhoneUser);
  const findUser = await userRepository.findOne({
    where: { full_name },
  });
  if (findUser) {
    throw new AppError("User already exists");
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    isAdm,
    full_name,
    password: hashedPassword,
    emails: [],
    phones: [],
  });

  await userRepository.save(user);

  Object.keys(emails).map((email) => emailRepository.create({ email, user }));

  Object.keys(phones).map((phone) => phoneRepository.create({ phone, user }));

  const userComplete = userRepository.findOne({ where: { full_name } });

  return userComplete;
};

export default createUserService;
