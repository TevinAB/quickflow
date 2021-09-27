import { Router } from 'express';
import customizationModel from './model';
import roleModel from './roleModel';
import profileModel from './profileModel';
import bcrypt from 'bcrypt';
import {
  wrapperGetFormData,
  wrapperEditFormData,
  wrapperGetListViews,
  wrapperGetPipelines,
  wrapperGetPipeline,
  wrapperCreatePipeline,
  wrapperEditPipeline,
  wrapperGetRoles,
  wrapperGetRole,
  wrapperCreateRole,
  wrapperEditRole,
  wrapperDeleteRole,
  wrapperGetProfiles,
  wrapperGetProfile,
  wrapperCreateProfile,
  wrapperEditProfile,
  wrapperDeleteProfile,
} from './controllers';

const customizationRoutes = Router();

customizationRoutes.get('/form/:type', wrapperGetFormData(customizationModel));

customizationRoutes.put('/form', wrapperEditFormData(customizationModel));

customizationRoutes.get('/lists', wrapperGetListViews(customizationModel));

customizationRoutes.get('/pipelines', wrapperGetPipelines(customizationModel));

customizationRoutes.get(
  '/pipeline/:_id',
  wrapperGetPipeline(customizationModel)
);

customizationRoutes.post(
  '/pipeline',
  wrapperCreatePipeline(customizationModel)
);

customizationRoutes.put(
  '/pipeline/:_id',
  wrapperEditPipeline(customizationModel)
);

customizationRoutes.get('/roles', wrapperGetRoles(roleModel));
customizationRoutes.get('/role/:_id', wrapperGetRole(roleModel));
customizationRoutes.post('/role', wrapperCreateRole(roleModel));
customizationRoutes.put('/role/:_id', wrapperEditRole(roleModel));
customizationRoutes.delete(
  '/role/:_id',
  wrapperDeleteRole(roleModel, profileModel)
);

customizationRoutes.get('/profiles', wrapperGetProfiles(profileModel));
customizationRoutes.get('/profile/:_id', wrapperGetProfile(profileModel));
customizationRoutes.post(
  '/profile',
  wrapperCreateProfile(profileModel, bcrypt.hash.bind(bcrypt))
);
customizationRoutes.put(
  '/profile/:_id',
  wrapperEditProfile(profileModel, bcrypt.hash.bind(bcrypt))
);

customizationRoutes.delete('/profile/:_id', wrapperDeleteProfile(profileModel));

export default customizationRoutes;
