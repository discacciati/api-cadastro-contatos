import { Router } from "express";
import {
  createContactController,
  showContactController,
  listContactController,
  updateContactController,
  deleteContactController,
} from "../controllers/contact/contact.controllers";
import VerifyToken from "../middlewares/verifyToken.middleware";

const contactRoute = Router();

contactRoute.post("/new", VerifyToken, createContactController);
contactRoute.get("/", VerifyToken, listContactController);
contactRoute.get("/:id", VerifyToken, showContactController);
contactRoute.patch("/:id", VerifyToken, updateContactController);
contactRoute.delete("/:id", VerifyToken, deleteContactController);

export default contactRoute;
