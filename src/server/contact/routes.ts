import { Router } from 'express';
import ContactModel from './model';
import {
  getContactWrapper,
  updateContactWrapper,
  deleteContactWrapper,
  createContactWrapper,
} from './controllers';

const contactRoute = Router();

contactRoute.get('/', getContactWrapper(ContactModel));

contactRoute.post('/create', createContactWrapper(ContactModel));

contactRoute.put('/update', updateContactWrapper(ContactModel));

contactRoute.delete('/delete', deleteContactWrapper(ContactModel));

export default contactRoute;
