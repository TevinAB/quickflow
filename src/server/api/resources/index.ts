//resource routes
import customizationRoutes from './customizable/routes';
import roleModel from './customizable/roleModel';
import { wrapperRoleLocator } from './middleware/roleLocator';
import { wrapperRoleAuthorizer } from './middleware/roleAuthorizer';
import jwtValidator from './middleware/jwtValidator';
import { Router } from 'express';

const resourceRoutes = Router();

//needs to be before the other middlewares on this path.
resourceRoutes.use(jwtValidator);
resourceRoutes.use(wrapperRoleLocator(roleModel));

resourceRoutes.use(
  '/customization',
  wrapperRoleAuthorizer('customization'),
  customizationRoutes
);

export default resourceRoutes;
