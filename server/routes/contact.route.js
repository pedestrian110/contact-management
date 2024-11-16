import Router from "express";
import {
  getContacts,
  createContact,
  deleteContact,
  getContactById,
  updateContact,
} from "../controllers/contact.controller.js";

const contactRouter = Router();

contactRouter.get("/", getContacts);
contactRouter.post("/create", createContact);
contactRouter.get("/contact/:id", getContactById);
contactRouter.put("/update/:id", updateContact);
contactRouter.delete("/delete/:id", deleteContact);

export default contactRouter;
