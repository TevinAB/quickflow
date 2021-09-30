import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import RequestException from '../../../exceptions/requestException';
import { HashFunction } from '../../../types';
import { Profile } from '../../resources/customizable/profileModel';

export function wrapperSignUp<T extends Model<Profile>>(
  profile: T,
  hash: HashFunction
) {
  return async function signUp(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { firstName, lastName, email, password, orgName } = request.body;
    try {
      if (!password) throw new RequestException('Missing password', 400);

      const userExists = await profile.exists({ email });

      if (!userExists) {
        const passwordHash = await hash(password, 10);

        const newProfile = new profile({
          firstName,
          lastName,
          email,
          passwordHash,
          orgName,
          ceo: true,
        });

        await newProfile.save();
        const { orgId, roleId, _id } = newProfile;

        request.middlewareInfo.orgSetupData = {
          orgId: String(orgId),
          roleId: String(roleId),
        };

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
        throw new RequestException('User already exists.', 400);
      }
    } catch (error) {
      next(error);
    }
  };
}
