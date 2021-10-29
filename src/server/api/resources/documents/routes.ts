import { baseModel, dealModel } from './model';
import { timelineModel } from '../timeline/model';
import {
  wrapperGetDocuments,
  wrapperGetDocument,
  wrapperCreateDocument,
  wrapperEditDocument,
  wrapperDeleteDocument,
  wrapperGetDeals,
  wrapperGetDealsOverRange,
} from './controllers';
import wrapperRoleAuthorizer from '../middleware/roleAuthorizer/roleAuthorizer';
import { Router } from 'express';

const documentRoutes = Router();
const fieldsToRemove =
  '-__v -__type -org_id -created_date -closed_date -timeline_id -associated_contacts';

//contacts

//query strings: ?pageNum&itemsPerPage
documentRoutes.get(
  '/contacts',
  wrapperRoleAuthorizer('contact'),
  wrapperGetDocuments(baseModel, {
    type: 'Contact',
    sortBy: 'first_name',
    select: fieldsToRemove,
  })
);

documentRoutes.get(
  '/contact/:_id',
  wrapperRoleAuthorizer('contact'),
  wrapperGetDocument(baseModel, timelineModel, {
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
  '/contact',
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
    select: fieldsToRemove,
  })
);

documentRoutes.get(
  '/account/:_id',
  wrapperRoleAuthorizer('account'),
  wrapperGetDocument(baseModel, timelineModel, {
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
  '/account',
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
    select: fieldsToRemove,
  })
);

documentRoutes.get(
  '/deal/:_id',
  wrapperRoleAuthorizer('deal'),
  wrapperGetDocument(baseModel, timelineModel, {
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
  '/deal',
  wrapperRoleAuthorizer('deal'),
  wrapperDeleteDocument(baseModel, timelineModel)
);

//[deal widget]
documentRoutes.get(
  '/deals/assc/:_id',
  wrapperRoleAuthorizer('deal'),
  wrapperGetDeals(baseModel)
);

documentRoutes.get(
  '/deals/range',
  wrapperRoleAuthorizer('deal'),
  wrapperGetDealsOverRange(dealModel)
);

export default documentRoutes;
