import { OpUnitType } from 'dayjs';
import { getPaginationData } from '../utils/pagination';
import { dateStartOf, dateEndOf, isValidDate } from '../../../utils/helpers';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { BaseDocument, Deal } from './model';
import { Timeline } from '../timeline/model';
import RequestException from '../../../exceptions/requestException';

interface DocOptions {
  type: 'Contact' | 'Account' | 'Deal';
  sortBy?: string;
  select?: string;
}

export function wrapperGetDocuments<T extends Model<BaseDocument>>(
  baseModel: T,
  options: DocOptions
) {
  return async function getDocuments(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { pageNum, itemsPerPage } = request.query;
    const { org_id } = request.middlewareInfo.jwtData;

    try {
      const documents = await baseModel
        .find({ org_id, __type: options.type })
        .sort(options.sortBy)
        .select(options.select);

      const items = Number(itemsPerPage);
      const page = Number(pageNum);

      if (Number.isNaN(page) || Number.isNaN(items))
        throw new RequestException('Query parameters must be numbers.', 400);

      const { startIndex, lastPage } = getPaginationData(
        documents.length,
        items,
        page
      );

      const result = documents.slice(startIndex, startIndex + items);

      response.json({ result, meta: { last_page: lastPage } });
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperGetDocument<
  T extends Model<BaseDocument>,
  U extends Model<Timeline>
>(baseModel: T, timelineModel: U, options: DocOptions) {
  return async function getDocument(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;

    try {
      const document = await baseModel.findById(_id).select(options.select);
      const timeline = await timelineModel.findById(document?.timeline_id);

      if (document) {
        response.json({ result: document, timeline });
      } else {
        throw new RequestException(`${options.type} not found.`, 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperCreateDocument<
  T extends Model<BaseDocument>,
  U extends Model<Timeline>
>(baseModel: T, timelineModel: U, options: DocOptions) {
  return async function createDocument(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { org_id } = request.middlewareInfo.jwtData;

    try {
      const {
        data,
        meta: { initiator },
      } = request.body;
      const document = new baseModel({
        ...data,
        org_id,
        __type: options.type,
      });
      const timeline = new timelineModel({ org_id, parent_id: document._id });

      const TIMELINE_ID = timeline._id;
      document.set('timeline_id', TIMELINE_ID);

      await timeline.save();
      await document.save();

      let associatedIds: string[] = [];

      //get linked timelines for account or deals
      if (options.type === 'Account' || options.type === 'Deal') {
        associatedIds = (
          data.associated_contacts as Array<{ timeline_id: any }>
        ).map((obj) => obj.timeline_id);
      }

      //add helper function to do this.
      request.middlewareInfo.timelineData = {
        timelineIds: [TIMELINE_ID, ...associatedIds],
        timelineToReturn: TIMELINE_ID,
        addResponse: true,
        itemType: 'other',
        body: '',
        title: `${options.type} created by ${initiator}`,
      };

      //add things for notif middleware if owner is detected
      if (data.owner.value) {
        request.middlewareInfo.notifData = {
          profileIds: [data.owner.value],
          notifType: options.type,
          title: `You were assigned to ${document.name}.`,
        };
      }

      request.middlewareInfo.response.data.result = document;

      next();
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperEditDocument<T extends Model<BaseDocument>>(
  baseModel: T,
  options: DocOptions
) {
  return async function editDocument(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;

    try {
      const {
        data,
        meta: { initiator },
      } = request.body;

      const document = await baseModel.findOneAndUpdate(
        { _id },
        { ...data },
        { new: true }
      );

      if (document) {
        const TIMELINE_ID = document.timeline_id;

        //set timeline data
        request.middlewareInfo.timelineData = {
          timelineIds: [TIMELINE_ID],
          timelineToReturn: TIMELINE_ID,
          addResponse: true,
          itemType: 'other',
          body: '',
          title: `${options.type} edited by ${initiator}`,
        };

        //to alert new owner, if any.
        const reassigned =
          String(document?.owner.value) === String(data.owner.value);

        if (document && reassigned) {
          request.middlewareInfo.notifData = {
            profileIds: [data.owner.value],
            notifType: options.type,
            title: `You were assigned to ${document.name}.`,
          };
        }

        request.middlewareInfo.response.data.result = document;

        next();
      } else {
        throw new RequestException(
          'Failed to update document; document not found',
          404
        );
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperDeleteDocument<
  T extends Model<BaseDocument>,
  U extends Model<Timeline>
>(baseModel: T, timelineModel: U) {
  return async function deleteDocument(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _ids } = request.body;

    try {
      const _id = [...(_ids as Array<string>)];

      await baseModel.deleteMany({ _id: { $in: _id } });
      await timelineModel.deleteMany({ parent_id: { $in: _id as Array<any> } });

      response.json({ message: 'Documents deleted.' });
    } catch (error) {
      next(error);
    }
  };
}

//deal widget api -- get deals linked to an _id
export function wrapperGetDeals<T extends Model<BaseDocument>>(baseModel: T) {
  return async function getDeals(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { _id } = request.params;

    try {
      const associated = await baseModel.find({
        __type: 'Deal',
        'associated_contacts._id': _id,
      });

      if (associated.length) {
        response.json({ result: associated });
      } else {
        throw new RequestException('Documents not found.', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}

export function wrapperGetDealsOverRange<T extends Model<Deal>>(baseModel: T) {
  return async function getOverRange(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { range, value, status } = request.query;

    try {
      const dateValue = value as string;
      if (!isValidDate(dateValue))
        throw new RequestException('Invalid date value.', 400);

      const rangeType = range as string;
      if (!['year', 'quarter'].includes(rangeType.toLowerCase()))
        throw new RequestException('Invalid range type', 400);

      const dealStatus = status as string;
      if (!['all', 'open', 'won', 'lost'].includes(dealStatus.toLowerCase()))
        throw new RequestException('Invalid deal status type', 400);

      const startDate = dateStartOf(dateValue, rangeType as OpUnitType);
      const endDate = dateEndOf(dateValue, rangeType as OpUnitType);

      const filters: Record<string, string> = {};
      if (dealStatus.toLowerCase() !== 'all') {
        filters['deal_status'] = dealStatus;
      }

      const deals = await baseModel.find({
        ...filters,
        created_date: { $lte: endDate, $gte: startDate },
      });

      if (deals.length) {
        response.json({ result: deals });
      } else {
        throw new RequestException('No deals found', 404);
      }
    } catch (error) {
      next(error);
    }
  };
}
