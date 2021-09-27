import { Router } from 'express';
import bcrypt from 'bcrypt';
import profileModel from '../../resources/customizable/profileModel';
import { wrapperLogin } from './controllers';

const loginRoutes = Router();

loginRoutes.post('/', wrapperLogin(profileModel, bcrypt.compare.bind(bcrypt)));

export default loginRoutes;
