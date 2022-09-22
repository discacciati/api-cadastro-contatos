import { IUserRequest, IUser } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";

const createUserService = async ({
  isAdm,
  emails,
  phones,
  password,
  full_name,
}: IUserRequest): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
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
    isActive: true,
    emails: [],
    phones: [],
  });

  await userRepository.save(user);

  fazer um email.map, e dentro dele coloco o emailRepository.create ({email, user})

  phone getRepository
  create

  fazer um get no userrepository,m findOne (id do usuario novo) e retorno esse usuario;

  return user;
};

export default createUserService;
