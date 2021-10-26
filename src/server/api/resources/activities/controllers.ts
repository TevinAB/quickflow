import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import RequestException from '../../../exceptions/requestException';
import { dateStartOf, dateEndOf, isValidDate } from '../../../utils/helpers';
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
    try {
      const { key, from, to, completed } = request.query;
      const { org_id } = request.middlewareInfo.jwtData;

      const searchKey = String(key) || 'end_date';
      if (!isValidDate(String(from)) || !isValidDate(String(from)))
        throw new RequestException('Missing query parameters from or to', 400);

      const start = dateStartOf(String(from), 'day');
      const end = dateEndOf(String(to), 'day');

      const isCompleted = String(completed);

      const filters: Record<string, boolean> = {};
      if (isCompleted.toLowerCase() === 'true') {
        filters['completed'] = true;
      } else if (isCompleted.toLowerCase() === 'false') {
        filters['completed'] = false;
      }

      const results = await activityModel.find({
        org_id,
        ...filters,
        __type: options.type,
        completed,
        [searchKey]: { $gte: start, $lte: end },
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
    try {
      const { org_id } = request.middlewareInfo.jwtData;
      const {
        data,
        meta: { initiator },
      } = request.body;

      const activity = new activityModel({
        ...data,
        org_id,
        __type: options.type,
      });

      await activity.save();

      request.middlewareInfo.response.data.result = activity;

      const affectedTimelines = activity.related_to.map(
        (doc: { timeline_id: any }) => doc.timeline_id
      );

      request.middlewareInfo.timelineData = {
        timelineIds: [...affectedTimelines],
        timelineToReturn: null,
        addResponse: false,
        title: `${options.type} created by ${initiator}`,
        itemType: options.type,
        itemBody: activity.name,
      };

      //notif data
      request.middlewareInfo.notifData = {
        title: `Added to ${options.type}: ${activity.name}`,
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
    try {
      const { _id } = request.params;
      const {
        data,
        meta: { initiator },
      } = request.body;

      const activity = await activityModel.findOneAndUpdate(
        { _id },
        {
          ...data,
          __type: options.type,
        },
        { new: true }
      );

      request.middlewareInfo.response.data.result = activity;

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
          itemBody: activity.name,
        };

        //notif data
        request.middlewareInfo.notifData = {
          title: `Change in ${options.type}: ${activity.name}`,
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
    try {
      const { _id } = request.params;
      const { initiator } = request.body;

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
          itemBody: activity.name,
        };

        //notif data
        request.middlewareInfo.notifData = {
          title: `${options.type}: ${activity.name} was canceled`,
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
