import { baseModel } from './model';
import { timelineModel } from '../timeline/model';
import {
  wrapperGetDocuments,
  wrapperGetDocument,
  wrapperCreateDocument,
  wrapperEditDocument,
  wrapperDeleteDocument,
  wrapperGetDeals,
} from './controllers';
import wrapperRoleAuthorizer from '../middleware/roleAuthorizer/roleAuthorizer';
import { Router } from 'express';

const documentRoutes = Router();

//contacts

//query strings: ?pageNum&itemsPerPage
documentRoutes.get(
  '/contacts',
  wrapperRoleAuthorizer('contact'),
  wrapperGetDocuments(baseModel, {
    type: 'Contact',
    sortBy: 'first_name',
    select: 'first_name last_name _id timeline_id',
  })
);

documentRoutes.get(
  '/contact/:_id',
  wrapperRoleAuthorizer('contact'),
  wrapperGetDocument(baseModel, {
    type: 'Contact',
    select: '-__v',
  })
);

documentRoutes.post(
  '/contact',
  wrapperRoleAuthorizer('contact'),
  wrapperCreateDocument(baseModel, timelineModel, { type: 'Contact' })
);

documentRoutes.put(
  '/contact/:_id',
  wrapperRoleAuthorizer('contact'),
  wrapperEditDocument(baseModel, { type: 'Contact' })
);

documentRoutes.delete(
  '/contact/:_id',
  wrapperRoleAuthorizer('contact'),
  wrapperDeleteDocument(baseModel, timelineModel)
);

//accounts
documentRoutes.get(
  '/accounts',
  wrapperRoleAuthorizer('account'),
  wrapperGetDocuments(baseModel, {
    type: 'Account',
    sortBy: 'name',
    select: 'name _id timeline_id',
  })
);

documentRoutes.get(
  '/account/:_id',
  wrapperRoleAuthorizer('account'),
  wrapperGetDocument(baseModel, {
    type: 'Account',
    select: '-__v',
  })
);

documentRoutes.post(
  '/account',
  wrapperRoleAuthorizer('account'),
  wrapperCreateDocument(baseModel, timelineModel, { type: 'Account' })
);

documentRoutes.put(
  '/account/:_id',
  wrapperRoleAuthorizer('account'),
  wrapperEditDocument(baseModel, { type: 'Account' })
);

documentRoutes.delete(
  '/account/:_id',
  wrapperRoleAuthorizer('account'),
  wrapperDeleteDocument(baseModel, timelineModel)
);

//deals
documentRoutes.get(
  '/deals',
  wrapperRoleAuthorizer('deal'),
  wrapperGetDocuments(baseModel, {
    type: 'Deal',
    sortBy: 'name',
    select: 'name value _id timeline_id',
  })
);

documentRoutes.get(
  '/deal/:_id',
  wrapperRoleAuthorizer('deal'),
  wrapperGetDocument(baseModel, {
    type: 'Deal',
    select: '-__v',
  })
);

documentRoutes.post(
  '/deal',
  wrapperRoleAuthorizer('deal'),
  wrapperCreateDocument(baseModel, timelineModel, { type: 'Deal' })
);

documentRoutes.put(
  '/deal/:_id',
  wrapperRoleAuthorizer('deal'),
  wrapperEditDocument(baseModel, { type: 'Deal' })
);

documentRoutes.delete(
  '/deal/:_id',
  wrapperRoleAuthorizer('deal'),
  wrapperDeleteDocument(baseModel, timelineModel)
);

//[deal widget]
documentRoutes.get(
  '/deals/assc/:_id',
  wrapperRoleAuthorizer('deal'),
  wrapperGetDeals(baseModel)
);

export default documentRoutes;
