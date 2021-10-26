import { Router } from 'express';
import bcrypt from 'bcrypt';
import profileModel from '../../resources/customizable/profileModel';
import roleModel from '../../resources/customizable/roleModel';
import { wrapperLogin } from './controllers';

const loginRoutes = Router();

loginRoutes.post(
  '/',
  wrapperLogin(profileModel, roleModel, bcrypt.compare.bind(bcrypt))
);

export default loginRoutes;
