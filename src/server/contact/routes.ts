import { Router } from 'express';
import ContactModel from './model';
import {
  wrapperGetResource,
  wrapperCreateResource,
  wrapperUpdateResource,
  wrapperDeleteResource,
} from '../utils/resourceMethods';

const contactRoute = Router();

contactRoute.get('/', wrapperGetResource(ContactModel, 'Contact not found.'));

contactRoute.post(
  '/create',
  wrapperCreateResource(ContactModel, 'Contact not added.')
);

contactRoute.put(
  '/update',
  wrapperUpdateResource(ContactModel, 'Contact update failed.')
);

contactRoute.delete(
  '/delete',
  wrapperDeleteResource(
    ContactModel,
    'Contact delete failed.',
    'Contact deleted'
  )
);

export default contactRoute;
