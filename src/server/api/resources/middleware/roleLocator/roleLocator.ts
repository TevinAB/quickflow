import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { Role } from '../../customizable/roleModel';

export default function wrapperRoleLocator<T extends Model<Role>>(role: T) {
  return async function roleLocator(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { role_id } = request.middlewareInfo.jwtData;
    try {
      const userRole = await role.findOne({ _id: role_id });

      if (userRole) {
        request.middlewareInfo.userRole = {
          view: {
            contact: userRole.view.contact,
            account: userRole.view.account,
            deal: userRole.view.deal,
          },
          create: {
            contact: userRole.create.contact,
            account: userRole.create.account,
            deal: userRole.create.deal,
            event: userRole.create.event,
            task: userRole.create.task,
            email: userRole.create.email,
          },
          edit: {
            contact: userRole.edit.contact,
            account: userRole.edit.account,
            deal: userRole.edit.deal,
            event: userRole.edit.event,
            task: userRole.edit.task,
          },
          delete_: {
            contact: userRole.delete_.contact,
            account: userRole.delete_.account,
            deal: userRole.delete_.deal,
            event: userRole.delete_.event,
            task: userRole.delete_.task,
          },
          is_admin: userRole.is_admin,
          orgId: userRole.org_id,
          roleName: userRole.role_name,
        };
      } else {
        throw new Error('Authorization failed, role not found.');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
