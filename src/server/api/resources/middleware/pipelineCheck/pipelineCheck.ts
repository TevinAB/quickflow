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
    const { _ids } = request.body;
    const { org_id } = request.middlewareInfo.jwtData;

    try {
      const _id = [...(_ids as Array<string>)].pop();

      //check if pipeline is in use.
      const deals = await baseModel.find({
        org_id,
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
