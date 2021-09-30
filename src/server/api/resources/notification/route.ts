import { Router } from 'express';
import { wrapperReadNotifications } from './controllers';
import profileModel from '../customizable/profileModel';

const notificationRoutes = Router();

notificationRoutes.put('/:_id', wrapperReadNotifications(profileModel));

export default notificationRoutes;
