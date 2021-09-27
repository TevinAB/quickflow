import { Router } from 'express';
import DealModel from './model';
import {
  wrapperGetResource,
  wrapperCreateResource,
  wrapperUpdateResource,
  wrapperDeleteResource,
} from '../utils/resourceMethods';

const dealRoutes = Router();

dealRoutes.get('/', wrapperGetResource(DealModel, 'Deal not found.'));
dealRoutes.post('/create', wrapperCreateResource(DealModel, 'Deal not added.'));
dealRoutes.put(
  '/update',
  wrapperUpdateResource(DealModel, 'Deal update failed.')
);
dealRoutes.delete(
  '/delete',
  wrapperDeleteResource(DealModel, 'Deal delete failed.', 'Deal deleted.')
);

export default dealRoutes;
