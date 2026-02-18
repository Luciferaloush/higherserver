import ContactMessage from '../models/ContactMessage.js';
import { AppError } from '../utils/errorHandler.js';

export const sendMessage = async(name, email, subject, message, phone) => {
          if(!name || !email || !subject || !message || !phone){
           throw new AppError('field is required', 400);
          }
          const contactMessage = ContactMessage.create({
                name,
                email,
                subject,
                message,
                phone    
          })
          return contactMessage;
}

export const getAllMessage = async() =>{
          const contactMessage = await ContactMessage.find().sort({ createdAt: -1 });
          return contactMessage;
}