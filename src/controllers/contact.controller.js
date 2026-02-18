import { AppError, asyncHandler } from '../utils/errorHandler.js';
import * as CONTACT from "../services/contact.service.js"

export const contactMessage = asyncHandler(async (req, res,) => {
          const {name, email, subject, message, phone} = req.body;
          const contact = await CONTACT.sendMessage(name, email, subject, message, phone);
          res.status(200).json({
                    Success: true,
                    message:"SEND SUCCESSFULLY",
                    contact
          });
});

export const allContact = asyncHandler(async (req, res, next) => {
          const contact = await CONTACT.getAllMessage();
          res.status(200).json({
                    Success: true,
                    contact
          });
});


