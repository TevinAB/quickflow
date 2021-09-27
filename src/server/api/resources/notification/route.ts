import { Router } from 'express';
import NotifModel from './model';
import {
  wrapperGetResource,
  wrapperCreateResource,
} from '../utils/resourceMethods';

const notificationRoutes = Router();

//change to a get all notif approach
notificationRoutes.get(
  '/',
  wrapperGetResource(NotifModel, 'Notifications not found.')
);
notificationRoutes.post(
  '/create',
  wrapperCreateResource(NotifModel, 'Notification not added.')
);

export default notificationRoutes;
