import { Router } from 'express';
import { activityModel } from './model';
import wrapperRoleAuthorizer from '../middleware/roleAuthorizer/roleAuthorizer';
import {
  wrapperGetActivity,
  wrapperCreateActivity,
  wrapperEditActivity,
  wrapperDeleteActivity,
} from './controllers';

const activityRoutes = Router();

/**
 * @param key - The key on the document to use -> start | end
 * @param from - Begining of range. e.g: 2020-10-30
 * @param to - End of range. e.g: 2021-1-21
 */
activityRoutes.get(
  '/events',
  wrapperGetActivity(activityModel, { type: 'Event' })
);

activityRoutes.post(
  '/event',
  wrapperRoleAuthorizer('event'),
  wrapperCreateActivity(activityModel, { type: 'Event' })
);

activityRoutes.put(
  '/event/:_id',
  wrapperRoleAuthorizer('event'),
  wrapperEditActivity(activityModel, { type: 'Event' })
);

activityRoutes.delete(
  '/event/:_id',
  wrapperRoleAuthorizer('event'),
  wrapperDeleteActivity(activityModel, { type: 'Event' })
);

//Task
activityRoutes.get(
  '/tasks',
  wrapperGetActivity(activityModel, { type: 'Task' })
);

activityRoutes.post(
  '/task',
  wrapperRoleAuthorizer('task'),
  wrapperCreateActivity(activityModel, { type: 'Task' })
);

activityRoutes.put(
  '/task/:_id',
  wrapperRoleAuthorizer('task'),
  wrapperEditActivity(activityModel, { type: 'Task' })
);

activityRoutes.delete(
  '/task/:_id',
  wrapperRoleAuthorizer('task'),
  wrapperDeleteActivity(activityModel, { type: 'Task' })
);

export default activityRoutes;
