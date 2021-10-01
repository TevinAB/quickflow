import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import RequestException from '../../../exceptions/requestException';
import { BaseDocument } from '../documents/model';

export function wrapperSearchDocuments<T extends Model<BaseDocument>>(
  baseModel: T
) {
  return async function searchDocuments(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { __type } = request.params;
    const { q: queryText } = request.query;

    try {
      const searchText = String(queryText);
      const allowedTypes = ['all', 'Contact', 'Account', 'Deal'];

      if (allowedTypes.includes(__type)) {
        let results = [];

        if (__type === 'all') {
          results = await baseModel.find({
            $text: { $search: searchText },
          });
        } else {
          results = await baseModel.find({
            __type,
            $text: { $search: searchText },
          });
        }

        if (!results.length)
          throw new RequestException('Nothing was found.', 404);

        response.json({ result: results });
      } else {
        throw new RequestException('Invalid search type', 400);
      }
    } catch (error) {
      next(error);
    }
  };
}

//profile search
