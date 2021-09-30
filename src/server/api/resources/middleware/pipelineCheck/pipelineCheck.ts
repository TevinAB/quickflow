import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { BaseDocument } from '../../documents/model';

export default function wrapperPipelineCheck<T extends Model<BaseDocument>>(
  baseModel: T
) {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;
    const { orgId } = request.middlewareInfo.jwtData;

    try {
      //check if pipeline is in use.
      const deals = await baseModel.find({
        orgId,
        __type: 'Deal',
        pipeline: _id,
      });

      if (deals.length) {
        request.middlewareInfo.deletePipeline = false;
      } else {
        request.middlewareInfo.deletePipeline = true;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
