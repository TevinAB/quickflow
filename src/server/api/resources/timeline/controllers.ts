import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { Timeline } from './model';
import RequestException from '../../../exceptions/requestException';

export function wrapperGetTimeLine<T extends Model<Timeline>>(
  timelineModel: T
) {
  return async function getTimeline(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;

    try {
      const timeline = await timelineModel.findOne({ _id }).select('-__v');

      if (timeline) {
        response.json(timeline);
      } else {
        throw new RequestException('Timeline not found.', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function addTimelineItem(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { _id } = request.params;
  const { item_type: itemType, item_body: itemBody, initiator } = request.body;

  request.middlewareInfo.timelineData = {
    timelineIds: [_id],
    timelineToReturn: _id,
    addResponse: true,
    title: `${itemType} created by ${initiator}`,
    itemType,
    itemBody,
  };

  next();
}

export function wrapperEditTimelineItem<T extends Model<Timeline>>(
  timelineModel: T
) {
  return async function editTimelineItem(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;

    try {
      const {
        _id: itemId,
        item_type: itemType,
        item_body: itemBody,
        meta: { initiator },
      } = request.body;
      await timelineModel.updateOne(
        { _id },
        { $pull: { timeline_items: { _id: itemId } } }
      );

      request.middlewareInfo.timelineData = {
        timelineIds: [_id],
        timelineToReturn: _id,
        addResponse: true,
        title: `${itemType} edited by ${initiator}`,
        itemBody,
        itemType,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
}
