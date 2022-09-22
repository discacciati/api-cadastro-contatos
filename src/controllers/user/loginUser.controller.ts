import { Request, Response } from "express";
import loginUserService from "../../services/user/loginUser.service";

const loginUserController = async (req: Request, res: Response) => {
  const { full_name, password } = req.body;
  const token = await loginUserService({ full_name, password });

  return res.json({ token });
};

export { loginUserController };
