import { Request, Response } from "express";
import createContactService from "../services/contact/createContact.service";
import deleteContactService from "../services/contact/deleteContact.service";
import listContactService from "../services/contact/listContact.service";
import showContactService from "../services/contact/showContact.service";
import updateContactService from "../services/contact/updateContact.service";
import { instanceToPlain } from "class-transformer";

const createContactController = async (req: Request, res: Response) => {
  const { full_name, emails, phones } = req.body;
  const newContact = await createContactService({
    emails,
    phones,
    full_name,
  });
  return res.status(201).json(instanceToPlain(newContact));
};

const listContactController = async (req: Request, res: Response) => {
  const contacts = await listContactService();
  return res.json(instanceToPlain(contacts));
};

const showContactController = async (req: Request, res: Response) => {
  const contactId = req.params.contactId;
  const contact = await showContactService({ contactId });
  return res.json(instanceToPlain(contact));
};

const updateContactController = async (req: Request, res: Response) => {
  const contactId = req.params.contactId;
  const { full_name, emails, password, phones } = req.body;
  const contactUpdate = await updateContactService({
    contactId,
    full_name,
    emails,
    phones,
  });
  return res.status(201).json(instanceToPlain(contactUpdate));
};

const deleteContactController = async (req: Request, res: Response) => {
  const contactId = req.params.contactId;
  await deleteContactService(contactId);
  return res.status(204).send();
};

export {
  createContactController,
  listContactController,
  deleteContactController,
  showContactController,
  updateContactController,
};
