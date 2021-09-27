import { Router } from 'express';
import EventModel from './model';
import {
  wrapperGetResource,
  wrapperCreateResource,
  wrapperUpdateResource,
  wrapperDeleteResource,
} from '../utils/resourceMethods';

const eventRoutes = Router();

eventRoutes.get('/', wrapperGetResource(EventModel, 'Event not found.'));
eventRoutes.post(
  '/create',
  wrapperCreateResource(EventModel, 'Event not added.')
);
eventRoutes.put(
  '/update',
  wrapperUpdateResource(EventModel, 'Event update failed.')
);
eventRoutes.delete(
  '/delete',
  wrapperDeleteResource(EventModel, 'Event delete failed.', 'Event deleted.')
);

export default eventRoutes;
