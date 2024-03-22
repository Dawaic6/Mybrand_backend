// ContactUsRoutes.ts
import { Router } from 'express';
import ContactUsController from '../controller/contact_controller';
const contactUsRoutes = Router();
contactUsRoutes.post('/post-contact-message', ContactUsController.createContactUs);
contactUsRoutes.put('/update-contact-message/:id', ContactUsController.updateContactUs);
contactUsRoutes.get('/getall-contact-message', ContactUsController.getAllContactUs);
contactUsRoutes.get('/getone-contact-message/:id', ContactUsController.getOneContactUs);
contactUsRoutes.delete('/delete-contact-message/:id', ContactUsController.deleteContactUs);

export default contactUsRoutes;