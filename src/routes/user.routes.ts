import { Router } from "express";
import createUser from "../controllers/user/createUser.controller";
import loginUser from "../controllers/user/loginUser.controller";
import listUser from "../controllers/user/listUser.controller";
import showUser from "../controllers/user/showUser.controller";
import updateUser from "../controllers/user/updateUser.controller";
import deleteUser from "../controllers/user/deleteUser.controller";
import VerifyToken from "../middelwares/verifyToken.middleware";
import VerifyAdmin from "../middelwares/verifyAdmin.middleware";

const userRoute = Router();

userRoute.post("/register", createUser);
userRoute.post("/login", loginUser);
userRoute.get("/", VerifyToken, VerifyAdmin, listUser);
userRoute.get("/:id", VerifyToken, showUser);
userRoute.patch("/:id", VerifyToken, updateUser);
userRoute.delete("/:id", VerifyToken, deleteUser);

export default userRoute;
