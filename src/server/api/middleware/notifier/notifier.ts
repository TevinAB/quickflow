import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { Profile } from '../../resources/customizable/profileModel';

export default function wrapperNotifier<T extends Model<Profile>>(
  profileModel: T
) {
  return async function notifier(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { notifType, title, profileIds } = request.middlewareInfo.notifData;
    if (!profileIds?.length || !notifType || !title) return next();

    try {
      const notification = {
        title,
        read: false,
        type: notifType,
        added: new Date().toISOString(),
      };

      await profileModel.updateMany(
        { _id: { $in: profileIds } },
        { $push: { notifications: notification } }
      );

      next();
    } catch (error) {
      next(error);
    }
  };
}
