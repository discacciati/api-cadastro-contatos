import { Router } from "express";
import createContact from "../controllers/contact/createContact.controller";
import showContact from "../controllers/contact/showContact.controller";
import listContact from "../controllers/contact/listContact.controller";
import updateContact from "../controllers/contact/updateContact.controller";
import deleteContact from "../controllers/contact/deleteContact.controller";
import VerifyToken from "../middelwares/verifyToken.middleware";

const contactRoute = Router();

contactRoute.post("/new", createContact);
contactRoute.get("/", VerifyToken, listContact);
contactRoute.get("/:id", VerifyToken, showContact);
contactRoute.patch("/:id", VerifyToken, updateContact);
contactRoute.delete("/:id", VerifyToken, deleteContact);

export default contactRoute;
