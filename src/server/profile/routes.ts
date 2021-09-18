import { Router } from 'express';
import ProfileModel from './model';
import {
  wrapperGetResource,
  wrapperCreateResource,
  wrapperUpdateResource,
  wrapperDeleteResource,
} from '../utils/resourceMethods';

const profileRoutes = Router();

profileRoutes.get('/', wrapperGetResource(ProfileModel, 'Profile not found.'));

//change to a specialized method after email functionality is ready
profileRoutes.post(
  '/create',
  wrapperCreateResource(ProfileModel, 'Profile not added.')
);
profileRoutes.put(
  '/update',
  wrapperUpdateResource(ProfileModel, 'Profile update failed.')
);
profileRoutes.delete(
  '/delete',
  wrapperDeleteResource(
    ProfileModel,
    'Profile delete failed.',
    'Profile deleted.'
  )
);

//add reset password route when email functionality is ready

export default profileRoutes;
