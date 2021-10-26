import { Router } from 'express';
import signUpRoutes from './signup/routes';
import loginRoutes from './login/routes';
import jwtBuilder from './middleware/jwtBuilder';
import jwtValidator from '../resources/middleware/jwtValidator/jwtValidator';

import { wrapperIsAuthenticated } from './login/controllers';
import profileModel from '../resources/customizable/profileModel';
import roleModel from '../resources/customizable/roleModel';

const authRoutes = Router();

authRoutes.use('/sign_up', signUpRoutes);
authRoutes.use('/login', loginRoutes);
authRoutes.use(
  '/authenticated',
  jwtValidator,
  wrapperIsAuthenticated(profileModel, roleModel)
);
authRoutes.use(jwtBuilder);

export default authRoutes;
