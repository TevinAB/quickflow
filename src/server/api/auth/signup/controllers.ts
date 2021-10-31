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
    try {
      const { name, first_name, last_name, email, password, org_name } =
        request.body.data;

      if (!password) throw new RequestException('Missing password', 400);

      const userExists = await profile.exists({ email });

      if (!userExists) {
        const password_hash = await hash(password, 10);

        const newProfile = new profile({
          name,
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
          username: name,
          userId: _id,
        };

        request.middlewareInfo.jwtData = {
          profileId: _id,
          first_name,
          last_name,
          email,
          org_id,
          role_id,
        };

        const userData = Object.assign(
          {},
          newProfile.toObject() as Record<string, unknown>
        );
        delete userData.password_hash;

        userData['is_admin'] = true;
        request.middlewareInfo.response.data.result = userData;

        next();
      } else {
        throw new RequestException('User already exists.', 400);
      }
    } catch (error) {
      next(error);
    }
  };
}
