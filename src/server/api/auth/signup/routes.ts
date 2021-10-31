import bcrypt from 'bcrypt';
import { Router } from 'express';
import Profile from '../../resources/customizable/profileModel';
import { wrapperSignUp } from './controllers';
import wrapperOrgBuilder from './middleware/orgBuilder/orgBuilder';
import customizationModel from '../../resources/customizable/model';
import { baseModel } from '../../resources/documents/model';
import { timelineModel } from '../../resources/timeline/model';
import roleModel from '../../resources/customizable/roleModel';

const signUpRoutes = Router();

signUpRoutes.post('/', wrapperSignUp(Profile, bcrypt.hash.bind(bcrypt)));
signUpRoutes.use(
  wrapperOrgBuilder(customizationModel, roleModel, baseModel, timelineModel)
);

export default signUpRoutes;
