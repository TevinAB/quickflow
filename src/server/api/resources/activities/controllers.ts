import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import RequestException from '../../../exceptions/requestException';
import { Activity } from './model';

interface ActivityOptions {
  type: 'Event' | 'Task';
}

export function wrapperGetActivity<T extends Model<Activity>>(
  activityModel: T,
  options: ActivityOptions
) {
  return async function getActivity(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { key, from, to } = request.query;
    const { org_id } = request.middlewareInfo.jwtData;

    try {
      const searchKey = String(key) || 'end';
      if (!from || !to)
        throw new RequestException('Missing query parameters from or to', 400);

      const start = String(from);
      const end = String(to);

      const results = await activityModel.find({
        org_id,
        __type: options.type,
        [searchKey]: { $gte: new Date(start), $lte: new Date(end) },
      });

      if (results.length) {
        response.json({ result: results });
      } else {
        throw new RequestException(`No ${options.type}s were found`, 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperCreateActivity<T extends Model<Activity>>(
  activityModel: T,
  options: ActivityOptions
) {
  return async function createActivity(
    request: Request,
    reponse: Response,
    next: NextFunction
  ) {
    const { org_id } = request.middlewareInfo.jwtData;
    const {
      data,
      meta: { initiator },
    } = request.body;

    try {
      const activity = new activityModel({
        ...data,
        org_id,
        __type: options.type,
      });

      await activity.save();

      request.middlewareInfo.response.data.activity = activity;

      const affectedTimelines = activity.related_to.map(
        (doc: { timeline_id: any }) => doc.timeline_id
      );

      request.middlewareInfo.timelineData = {
        timelineIds: [...affectedTimelines],
        timelineToReturn: null,
        addResponse: false,
        title: `${options.type} created by ${initiator}`,
        itemType: options.type,
        itemBody: activity.title,
      };

      //notif data
      request.middlewareInfo.notifData = {
        title: `Added to ${options.type}: ${activity.title}`,
        notifType: options.type,
        profileIds: [...activity.involved],
      };

      next();
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperEditActivity<T extends Model<Activity>>(
  activityModel: T,
  options: ActivityOptions
) {
  return async function editActivity(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;
    const {
      data,
      meta: { initiator },
    } = request.body;

    try {
      const activity = await activityModel.findOneAndUpdate(
        { _id },
        {
          ...data,
          __type: options.type,
        },
        { new: true }
      );

      request.middlewareInfo.response.data.activity = activity;

      if (activity) {
        const affectedTimelines = activity.related_to.map(
          (doc: { timeline_id: any }) => doc.timeline_id
        );

        request.middlewareInfo.timelineData = {
          timelineIds: [...affectedTimelines],
          timelineToReturn: null,
          addResponse: false,
          title: `${options.type} edited by ${initiator}`,
          itemType: options.type,
          itemBody: activity.title,
        };

        //notif data
        request.middlewareInfo.notifData = {
          title: `Change in ${options.type}: ${activity.title}`,
          notifType: options.type,
          profileIds: [...activity.involved],
        };
      } else {
        throw new RequestException(
          'Activity update failed, activity not found.',
          404
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperDeleteActivity<T extends Model<Activity>>(
  activityModel: T,
  options: ActivityOptions
) {
  return async function deleteActivity(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;
    const { initiator } = request.body;

    try {
      const activity = await activityModel.findOne({ _id });

      if (activity) {
        const affectedTimelines = activity.related_to.map(
          (doc: { timeline_id: any }) => doc.timeline_id
        );

        request.middlewareInfo.timelineData = {
          timelineIds: [...affectedTimelines],
          timelineToReturn: null,
          addResponse: false,
          title: `${options.type} deleted by ${initiator}`,
          itemType: options.type,
          itemBody: activity.title,
        };

        //notif data
        request.middlewareInfo.notifData = {
          title: `${options.type}: ${activity.title} was canceled`,
          notifType: options.type,
          profileIds: [...activity.involved],
        };
      } else {
        throw new RequestException('Activity not found.', 404);
      }

      await activity.remove();
      request.middlewareInfo.response.data = { result: 'Activity deleted.' };

      next();
    } catch (error) {
      next(error);
    }
  };
}
