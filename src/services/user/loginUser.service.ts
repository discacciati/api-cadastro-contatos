import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entity";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { IUserLogin } from "../../interfaces/users";
import { AppError } from "../../errors/AppError";
import "dotenv/config";

const loginUserService = async ({
  full_name,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      full_name: full_name,
    },
  });

  if (!user) {
    throw new AppError("Invalid credentials", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 403);
  }

  const token = jwt.sign(
    {
      id: user.id,
      isAdm: user.isAdm,
    },
    "SECRET_KEY",
    {
      expiresIn: "24h",
    }
  );

  return token;
};

export default loginUserService;
