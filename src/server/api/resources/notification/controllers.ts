import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { Profile } from '../customizable/profileModel';
import RequestException from '../../../exceptions/requestException';

export function wrapperReadNotifications<T extends Model<Profile>>(
  profileModel: T
) {
  return async function readNotifications(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;

    try {
      const updatedDoc = await profileModel.findOneAndUpdate(
        { _id, 'notifications.read': false },
        { 'notifications.$.read': true },
        { new: true }
      );
      if (updatedDoc) {
        response.json({ notifications: updatedDoc.notifications });
      } else {
        throw new RequestException(
          'Failed to mark notifications as read.',
          400
        );
      }
    } catch (error) {
      next(error);
    }
  };
}
