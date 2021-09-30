import { Resources } from '../../../../types';
import { Request, Response, NextFunction } from 'express';

//should be called for every route that needs role authorization
export default function wrapperRoleAuthorizer(resourceType: Resources) {
  return function roleAuthorizer(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { userRole } = request.middlewareInfo;

    const HTTP_METHOD = request.method.toLowerCase();
    let actionType = '';

    switch (HTTP_METHOD) {
      case 'get':
        actionType = 'view';
        break;

      case 'post':
        actionType = 'create';
        break;

      case 'put':
        actionType = 'edit';
        break;

      case 'delete':
        actionType = 'delete_';
        break;
    }

    if (resourceType === 'customization' && userRole.isAdmin) {
      next();
    } else if (userRole[actionType][resourceType]) {
      next();
    } else {
      response.status(403).json({ message: 'Access Forbidden.' });
    }
  };
}
