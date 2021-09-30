import customizationRoutes from './customizable/routes';
import documentRoutes from './documents/routes';
import timelineRoutes from './timeline/routes';
import roleModel from './customizable/roleModel';
import profileModel from './customizable/profileModel';
import { timelineModel } from './timeline/model';
import wrapperRoleLocator from './middleware/roleLocator/roleLocator';
import wrapperRoleAuthorizer from './middleware/roleAuthorizer/roleAuthorizer';
import jwtValidator from './middleware/jwtValidator/jwtValidator';
import wrapperNotifier from '../middleware/notifier/notifier';
import wrapperTimelineManager from './middleware/timelineManager/timelineManager';
import notificationRoutes from './notification/route';
import { Router } from 'express';

const resourceRoutes = Router();

//needs to be before the other middlewares on this path.
resourceRoutes.use(jwtValidator);
resourceRoutes.use(wrapperRoleLocator(roleModel));

resourceRoutes.use(
  '/customization',
  wrapperRoleAuthorizer('customization'),
  customizationRoutes
);
resourceRoutes.use('/document', documentRoutes);
resourceRoutes.use('/notifications', notificationRoutes);
resourceRoutes.use('/timeline', timelineRoutes);

resourceRoutes.use(wrapperNotifier(profileModel));
resourceRoutes.use(wrapperTimelineManager(timelineModel));

export default resourceRoutes;
