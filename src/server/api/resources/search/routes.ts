import { Router } from 'express';
import { wrapperSearchDocuments } from './controllers';
import { baseModel } from '../documents/model';

const searchRoutes = Router();

/**
 * result: {
 *  name: 'doc name',
 *  _id: 'doc id',
 *  timeline_id: 'doc's timeline _id'
 * }
 *
 * ?q='some query text'
 */
searchRoutes.get('/documents/:__type', wrapperSearchDocuments(baseModel));

export default searchRoutes;
