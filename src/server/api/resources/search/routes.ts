import { Router } from 'express';
import { wrapperSearchDocuments, wrapperSearchProfiles } from './controllers';
import { baseModel } from '../documents/model';
import profileModel from '../customizable/profileModel';

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

/**
 * result: {
 *  first_name: '',
 *  last_name: ''
 *  _id: 'doc id',
 * }
 *
 * ?q='some query text'
 */
searchRoutes.get('/profiles', wrapperSearchProfiles(profileModel));

export default searchRoutes;
