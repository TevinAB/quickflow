import { Router } from 'express';
import TaskModel from './model';
import {
  wrapperGetResource,
  wrapperCreateResource,
  wrapperUpdateResource,
  wrapperDeleteResource,
} from '../utils/resourceMethods';

const taskRoutes = Router();

taskRoutes.get('/', wrapperGetResource(TaskModel, 'Task not found.'));
taskRoutes.post('/create', wrapperCreateResource(TaskModel, 'Task not added.'));
taskRoutes.put(
  '/update',
  wrapperUpdateResource(TaskModel, 'Task update failed.')
);
taskRoutes.delete(
  '/delete',
  wrapperDeleteResource(TaskModel, 'Task delete failed.', 'Task deleted.')
);

export default taskRoutes;
