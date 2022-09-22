import { Request, Response } from "express";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import listUserService from "../services/users/listUser.service";
import showUserService from "../services/users/showUser.service";
import updateUserService from "../services/users/updateUser.service";
import { instanceToPlain } from "class-transformer";

const createUserController = async (req: Request, res: Response) => {
  const { full_name, emails, phones, password, isAdm } = req.body;
  const newUser = await createUserService({
    isAdm,
    emails,
    phones,
    password,
    full_name,
  });
  return res.status(201).json(instanceToPlain(newUser));
};

const listUserController = async (req: Request, res: Response) => {
  const users = await listUserService();
  return res.json(instanceToPlain(users));
};

const showUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await showUserService({ userId });
  return res.json(instanceToPlain(user));
};

const updateUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const { full_name, emails, password, phones } = req.body;
  const userUpdate = await updateUserService({
    userId,
    full_name,
    emails,
    password,
    phones,
  });
  return res.status(201).json(instanceToPlain(userUpdate));
};

const deleteUserController = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  await deleteUserService(userId);
  return res.status(204).send();
};

export {
  createUserController,
  listUserController,
  deleteUserController,
  showUserController,
  updateUserController,
};
