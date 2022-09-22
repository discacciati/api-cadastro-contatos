import { Request, Response } from "express";
import createUserService from "../../services/user/createUser.service";
import deleteUserService from "../../services/user/deleteUser.service";
import listUserService from "../../services/user/listUser.service";
import showUserService from "../../services/user/showUser.service";
import updateUserService from "../../services/user/updateUser.service";
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
  const id = req.params.id;
  const user = await showUserService(id);
  return res.json(instanceToPlain(user));
};

const updateUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const userDataUpdate = req.body;
  const userUpdate = await updateUserService(id, userDataUpdate);
  return res.status(201).json(instanceToPlain(userUpdate));
};

const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  await deleteUserService(id);
  return res.status(204).send();
};

export {
  createUserController,
  listUserController,
  deleteUserController,
  showUserController,
  updateUserController,
};
