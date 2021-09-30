import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { Profile } from '../../resources/customizable/profileModel';
import RequestException from '../../../exceptions/requestException';
import { HashCompare } from '../../../types';

export function wrapperLogin<T extends Model<Profile>>(
  profile: T,
  hashCompare: HashCompare
) {
  return async function login(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { email, password } = request.body;
    try {
      if (!email) throw new Error('Email not provided.');
      if (!password) throw new Error('Password not provided.');

      const user = await profile.findOne({ email });

      if (user) {
        let passwordValid = false;

        if (user.passwordHash) {
          passwordValid = await hashCompare(password, user.passwordHash);
        }

        if (passwordValid) {
          const { _id, firstName, lastName, email, orgId, roleId } = user;
          request.middlewareInfo.jwtData = {
            profileId: _id,
            firstName,
            lastName,
            email,
            orgId,
            roleId,
          };
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
