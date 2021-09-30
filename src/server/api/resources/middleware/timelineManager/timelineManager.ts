import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { Timeline } from '../../timeline/model';

export default function wrapperTimelineManager<T extends Model<Timeline>>(
  timelineModel: T
) {
  return async function timelineManager(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const {
      timelineIds,
      addResponse,
      timelineToReturn,
      title,
      itemType,
      itemBody,
    } = request.middlewareInfo.timelineData;

    if (!timelineIds?.length) return next();

    try {
      const timelineItem = {
        title,
        itemType,
        body: itemBody,
        date: new Date().toISOString(),
      };

      await timelineModel.updateMany(
        {
          _id: { $in: timelineIds },
        },
        { $push: { timelineItems: timelineItem } },
        { new: true }
      );

      if (addResponse && timelineToReturn) {
        const timeline = await timelineModel.findOne({
          _id: timelineToReturn,
        });

        request.middlewareInfo.response.data.timeline = timeline;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
