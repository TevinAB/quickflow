import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { Profile } from '../../resources/customizable/profileModel';
import { Role } from '../../resources/customizable/roleModel';
import RequestException from '../../../exceptions/requestException';
import { HashCompare } from '../../../types';

export function wrapperIsAuthenticated<
  T extends Model<Profile>,
  R extends Model<Role>
>(profile: T, role: R) {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { email } = request.middlewareInfo.jwtData;
      const user = await profile.findOne({ email });

      if (user) {
        const userRole = await role.findById(user.role_id);

        const userData = Object.assign(
          {},
          user.toObject() as Record<string, unknown>
        );
        delete userData.password_hash;

        userData['is_admin'] = userRole?.is_admin;

        response.json({ result: userData });
      } else {
        throw new RequestException('User not found', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperLogin<T extends Model<Profile>, R extends Model<Role>>(
  profile: T,
  role: R,
  hashCompare: HashCompare
) {
  return async function login(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = request.body;
      if (!email) throw new Error('Email not provided.');
      if (!password) throw new Error('Password not provided.');

      const user = await profile.findOne({ email });

      if (user) {
        let passwordValid = false;

        if (user.password_hash) {
          passwordValid = await hashCompare(password, user.password_hash);
        }

        if (passwordValid) {
          const { _id, first_name, last_name, email, org_id, role_id } = user;
          request.middlewareInfo.jwtData = {
            profileId: _id,
            first_name,
            last_name,
            email,
            org_id,
            role_id,
          };

          const userRole = await role.findById(user.role_id);

          const userData = Object.assign(
            {},
            user.toObject() as Record<string, unknown>
          );
          delete userData.password_hash;

          userData['is_admin'] = userRole?.is_admin;
          request.middlewareInfo.response.data.result = userData;
          next();
        } else {
          throw new RequestException('Password is incorrect.', 400);
        }
      } else {
        throw new RequestException('User not found.', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}
