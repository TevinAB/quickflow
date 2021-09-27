import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { Role } from '../customizable/roleModel';

export function wrapperRoleLocator<T extends Model<Role>>(role: T) {
  return async function roleLocator(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { roleId } = request.middlewareInfo.jwtData;
    try {
      const userRole = await role.findOne({ _id: roleId });

      if (userRole) {
        request.middlewareInfo.userRole = {
          view: {
            ...userRole.view,
          },
          create: {
            ...userRole.create,
          },
          edit: {
            ...userRole.edit,
          },
          delete_: {
            ...userRole.delete_,
          },
          isAdmin: userRole.isAdmin,
          orgId: userRole.orgId,
          roleName: userRole.roleName,
        };
      } else {
        throw new Error('Authorization failed, role not found.');
      }

      next();
    } catch (error) {
      response.status(400).json({ message: (error as Error).message });
    }
  };
}
