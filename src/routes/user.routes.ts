import { Router } from "express";
import { loginUserController } from "../controllers/user/loginUser.controller";
import {
  createUserController,
  listUserController,
  deleteUserController,
  showUserController,
  updateUserController,
} from "../controllers/user/user.controllers";
import VerifyToken from "../middlewares/verifyToken.middleware";
import VerifyAdmin from "../middlewares/verifyAdmin.middleware";

const userRoute = Router();

userRoute.post("/register", createUserController);
userRoute.post("/login", loginUserController);
userRoute.get("/", VerifyToken, VerifyAdmin, listUserController);
userRoute.get("/:id", VerifyToken, showUserController);
userRoute.patch("/:id", VerifyToken, updateUserController);
userRoute.delete("/:id", VerifyToken, deleteUserController);

export default userRoute;
