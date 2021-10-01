import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import RequestException from '../../../exceptions/requestException';
import { BaseDocument } from '../documents/model';
import { Profile } from '../customizable/profileModel';

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
          results = await baseModel
            .find({
              $text: { $search: searchText },
            })
            .select('name _id timeline_id');
        } else {
          results = await baseModel
            .find({
              __type,
              $text: { $search: searchText },
            })
            .select('name _id timeline_id');
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

export function wrapperSearchProfiles<T extends Model<Profile>>(
  profileModel: T
) {
  return async function searchProfiles(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { q: queryText } = request.query;

    try {
      const searchText = String(queryText);

      const results = await profileModel
        .find({
          $text: { $search: searchText },
        })
        .select('first_name last_name _id');

      if (results.length) {
        response.json({ result: results });
      } else {
        throw new RequestException('Nothing was found', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}
