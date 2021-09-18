import { Router } from 'express';
import RoleModel from './model';
import {
  wrapperGetResource,
  wrapperCreateResource,
  wrapperUpdateResource,
  wrapperDeleteResource,
} from '../utils/resourceMethods';

const roleRoutes = Router();

roleRoutes.get('/', wrapperGetResource(RoleModel, 'Role not found.'));
roleRoutes.post('/create', wrapperCreateResource(RoleModel, 'Role not added.'));
roleRoutes.put(
  '/update',
  wrapperUpdateResource(RoleModel, 'Role update failed.')
);

//eventually replace this with a specialized delete role function -- users need fallback role
roleRoutes.delete(
  '/delete',
  wrapperDeleteResource(RoleModel, 'Role delete failed.', 'Role deleted.')
);

export default roleRoutes;
