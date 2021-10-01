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
    const { first_name, last_name, email, password, org_name } = request.body;
    try {
      if (!password) throw new RequestException('Missing password', 400);

      const userExists = await profile.exists({ email });

      if (!userExists) {
        const password_hash = await hash(password, 10);

        const newProfile = new profile({
          first_name,
          last_name,
          email,
          password_hash,
          org_name,
          ceo: true,
        });

        await newProfile.save();
        const { org_id, role_id, _id } = newProfile;

        request.middlewareInfo.orgSetupData = {
          org_id: String(org_id),
          role_id: String(role_id),
        };

        request.middlewareInfo.jwtData = {
          profileId: _id,
          first_name,
          last_name,
          email,
          org_id,
          role_id,
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
